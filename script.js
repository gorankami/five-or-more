var CELL_CLASS = {
  CLEAR   : "cell",
  SELECTED: "cell selected"
};


var MARBLE_CLASS = {
  CLEAR     : "marble",
  RED       : "marble red",
  GREEN     : "marble green",
  ORANGE    : "marble orange",
  LIGHT_BLUE: "marble lightblue",
  BLUE      : "marble blue",
  YELLOW    : "marble yellow",
  PURPLE    : "marble purple"
};

var marbleClasses = [
  MARBLE_CLASS.RED,
  MARBLE_CLASS.GREEN,
  MARBLE_CLASS.ORANGE,
  MARBLE_CLASS.LIGHT_BLUE,
  MARBLE_CLASS.BLUE,
  MARBLE_CLASS.YELLOW,
  MARBLE_CLASS.PURPLE
];

var nextThreeMarbleClasses = [];

var table       = [];
var tableMatrix = [];

var tableWidth  = 9,
    tableHeight = 9;

function init() {
  setThreeRandomMarbleClasses();
  var tableElement = document.getElementsByTagName("table")[0];

  for (var i = 0; i < tableHeight; i++) {
    var row = document.createElement("tr");
    tableElement.appendChild(row);
    var tableRow = [];
    for (var j = 0; j < tableWidth; j++) {
      var cell       = document.createElement("td");
      //set coordinates
      cell.dataset.x = j;
      cell.dataset.y = i;
      cell.className = CELL_CLASS.CLEAR;

      var marble       = document.createElement("div");
      marble.className = MARBLE_CLASS.CLEAR;
      marble.onclick   = click;
      cell.appendChild(marble);
      row.appendChild(cell);
      tableRow.push(cell);
      tableMatrix.push(cell);
    }
    table.push(tableRow);
  }
  setThreeRandomMarbles();
}

function setThreeRandomMarbleClasses() {
  nextThreeMarbleClasses = [marbleClasses[random(6)], marbleClasses[random(6)], marbleClasses[random(6)]];
  for (var i in nextThreeMarbleClasses) {
    document.getElementById("next-" + i).className = "next-marble " + nextThreeMarbleClasses[i];
  }
}

function setThreeRandomMarbles() {
  for (var marbleClass in nextThreeMarbleClasses) {
    var m = getRandomClearMarble();
    if (m) m.className = nextThreeMarbleClasses[marbleClass];
  }
  setThreeRandomMarbleClasses()
}


function random(max) {
  return Math.floor(Math.random() * max);
}

function getRandomClearMarble() {

  var arrayOfCells = [];
  table.forEach(function (row) {
    arrayOfCells = arrayOfCells.concat(row);
  });
  var clearCells = arrayOfCells.map(function (cell) {
    return cell.children ? cell.children[0] : null;
  }).filter(function (marble) {
    return !!marble && marble.className === MARBLE_CLASS.CLEAR;
  });
  if (clearCells.length) {
    return clearCells[random(clearCells.length - 1)];
  } else {
    return null;
  }
}

var selected = null;

function click(event) {
  var marble = event.target;
  var cell   = marble.parentNode;

  if (!selected) {
    //first selection
    select(cell);
  } else if (cell === selected) {
    //selected same cell, just deselect
    deselect(cell);
  } else {
    //selected one but
    if (isMarble(selected) && !isMarble(cell)) {
      var startPoint = new Point(Number(selected.dataset.x), Number(selected.dataset.y));
      var endPoint   = new Point(Number(cell.dataset.x), Number(cell.dataset.y));
      // var finish        = pathFinder(selectedPoint, marble);
      var isPathFund = findPath(startPoint, endPoint);
      if (isPathFund) {
        moveMarble(selected, cell);
        if (!clearFiveOrMore()) {
          setThreeRandomMarbles();
          //if random marbles complete a line by accident
          clearFiveOrMore();
        }
      }
      deselect(selected);

    } else {
      deselect(selected);
      select(cell);
    }
  }
}

function findPath(startPoint, endPoint) {
  var grid = table.map(function (row) {
    return row.map(function (cell) {
      return cell.children[0].className === MARBLE_CLASS.CLEAR ? 1 : 0;
    });
  });

  var graph = new Graph(grid);
  var start = graph.grid[startPoint.y][startPoint.x];
  var end   = graph.grid[endPoint.y][endPoint.x];
  return astar.search(graph, start, end).length;
}

function select(element) {
  selected          = element;
  element.className = CELL_CLASS.SELECTED;
}

function deselect(element) {
  selected          = null;
  element.className = CELL_CLASS.CLEAR;
}

function moveMarble(from, to) {
  var fromMarble       = from.children[0];
  var toMarble         = to.children[0];
  toMarble.className   = fromMarble.className;
  fromMarble.className = MARBLE_CLASS.CLEAR;
}

function isMarble(element) {
  var marble = element.children[0];
  return marble.className !== MARBLE_CLASS.CLEAR;
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function clearFiveOrMore() {
  var transponedTable         = transpone(table);
  var diagonalizedTable       = diagonalizeTable(table);
  var transponedDiagonalTable = diagonalizeTable(transponedTable);//doesnt really work

  var results = [];
  results     = results.concat(findFiveOrMoreInMatrix(table));
  results     = results.concat(findFiveOrMoreInMatrix(transponedTable));
  results     = results.concat(findFiveOrMoreInMatrix(diagonalizedTable));
  results     = results.concat(findFiveOrMoreInMatrix(transponedDiagonalTable));

  results.forEach(function (cell) {
    cell.children[0].className = MARBLE_CLASS.CLEAR;
  });

  return results.length;
}

function transpone(normalTable) {
  var transponedTable = [];
  normalTable[0].forEach(function (i, index) {
    transponedTable[index] = [];
  });
  for (var indexRow = 0; indexRow < normalTable.length; indexRow++) {
    for (var indexCol = 0; indexCol < normalTable[indexRow].length; indexCol++) {
      transponedTable[indexCol][indexRow] = normalTable[indexRow][indexCol];
    }
  }

  return transponedTable;
}

function findFiveOrMoreInMatrix(matrix) {
  var results = [];
  for (var row = 0; row < matrix.length; row++) {
    var rowResults = [1];
    for (var col = 1; col < matrix[row].length; col++) {
      if (matrix[row][col] && matrix[row][col - 1]) {
        if (matrix[row][col].children[0].className === matrix[row][col - 1].children[0].className && matrix[row][col - 1].children[0].className != MARBLE_CLASS.CLEAR) {
          rowResults[col] = rowResults[col - 1] + 1;
        } else {
          rowResults[col] = 1;
        }
      }
    }
    for (var i = rowResults.length - 1; i >= 0; i--) {
      if (rowResults[i] >= 5) {
        for (var j = rowResults[i]; j >= 1; j--) {
          results.push(matrix[row][i]);
          i--;
        }
      }
    }
  }
  return results;
}

function diagonalizeTable(matrix) {
  var diagonalizedTable = [];
  for (var j = 0; j < tableWidth + tableHeight - 1; j++) {
    var row = [];
    for (var i = j; i >= 0; i--) {
      if (i < tableHeight && (j - i) < tableWidth) {
        row.push(matrix[i][j - i]);
      } else {
        row.push(null);
      }
    }
    diagonalizedTable.push(row);
  }
  //fix missing cells
  for (var i = 0; i < tableWidth + tableHeight - 1; i++) {
    for (var j = 0; j < tableWidth + tableHeight - 1; j++) {
      if (!diagonalizedTable[i][j]) diagonalizedTable[i][j] = null;
    }
  }
  return diagonalizedTable;
}
