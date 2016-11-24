var CELL_CLASS = {
  CLEAR   : "cell",
  SELECTED: "cell selected"
};


var MARBLE_CLASS = {
  CLEAR     : "marble",
  CHECKED   : "marble checked",
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

var table = [];

var tableWidth  = 9,
    tableHeight = 9;

function init() {
  setThreeRandomMarbleClasses();
  var tableElement = document.getElementsByTagName("table")[0];

  for (var i = 0; i < tableHeight; i++) {
    var row = document.createElement("tr");
    tableElement.appendChild(row);
    for (var j = 0; j < tableWidth; j++) {
      var cell       = document.createElement("td");
      cell.className = CELL_CLASS.CLEAR;

      var marble       = document.createElement("div");
      marble.className = MARBLE_CLASS.CLEAR;
      marble.onclick   = click;
      cell.appendChild(marble);
      row.appendChild(cell);
      table.push(cell);
    }
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
  var clearCells = table.map(function (cell) {
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
      //var selectedCoordinates = new Point() //TODO find x and y for cstart
      //var finish = pathFinder(selectedCoordinates,marble)
      moveMarble(selected, cell);
      deselect(selected);
      setThreeRandomMarbles();
    } else {
      deselect(selected);
      select(cell);
    }
  }
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

function pathFinder(step, finish) {
  if (!step) return null;
  var currentMarble = getMarble(step);
  if(currentMarble.className === MARBLE_CLASS.CLEAR) currentMarble.className =MARBLE_CLASS.CHECKED;
  var up          = moveUp(step);
  var marbleUp    = up ? getMarble(up) : null;
  var down        = moveDown(step);
  var marbleDown  = down ? getMarble(down) : null;
  var left        = moveLeft(step);
  var marbleLeft  = left ? getMarble(left) : null;
  var right       = moveRight(step);
  var marbleRight = right ? getMarble(right) : null;

  //1. check if those are finish cells. if one of them is, return that cell
  if (marbleUp === finish || marbleDown === finish || marbleLeft === finish || marbleRight === finish) {
    return finish;
  }

  //2. No finals? Pick empty cells and run pathFinder on them, return || values or return null (none is found)
  return (marbleUp.className === MARBLE_CLASS.CLEAR && pathFinder(up, finish)) ||
    (marbleDown.className === MARBLE_CLASS.CLEAR && pathFinder(down, finish)) ||
    (marbleLeft.className === MARBLE_CLASS.CLEAR && pathFinder(left, finish)) ||
    (marbleRight.className === MARBLE_CLASS.CLEAR && pathFinder(right, finish)) || null;
}

function getMarble(step) {
  var cell = table[step.y * tableHeight + step.x];
  return cell && cell.children ? cell.children[0] : null;
}

function moveUp(step) {
  if (step.y == 0) return null;
  return new Point(step.x, step.y - 1);
}

function moveDown(step) {
  if (step.y <= tableHeight) return null;
  return new Point(step.x, step.y + 1);
}

function moveLeft(step) {
  if (step.x == 0)return null;
  return new Point(step.x - 1, step.y);
}

function moveRight(step) {
  if (step.x <= tableWidth) return null;
  return new Point(step.x + 1, step.y);
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}