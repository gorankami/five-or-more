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

var marbleClasses = [MARBLE_CLASS.RED, MARBLE_CLASS.GREEN, MARBLE_CLASS.ORANGE, MARBLE_CLASS.LIGHT_BLUE, MARBLE_CLASS.BLUE, MARBLE_CLASS.YELLOW, MARBLE_CLASS.PURPLE];

var nextThreeMarbleClasses = [];

var table = null;

function init() {
  setThreeRandomMarbleClasses();
  table = document.getElementsByTagName("table")[0];

  for (var i = 0; i < 9; i++) {
    var row = document.createElement("tr");
    table.appendChild(row);
    for (var j = 0; j < 9; j++) {
      var cell       = document.createElement("td");
      cell.className = CELL_CLASS.CLEAR;

      var marble       = document.createElement("div");
      marble.className = MARBLE_CLASS.CLEAR;
      marble.onclick   = click;
      cell.appendChild(marble);
      row.appendChild(cell);
    }
  }
  setThreeRandomMarbles();
}

function setThreeRandomMarbleClasses() {
  nextThreeMarbleClasses = [marbleClasses[random(6)], marbleClasses[random(6)], marbleClasses[random(6)]];
  for(var i in nextThreeMarbleClasses){
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
  var clearCells = [];
  var rows       = table.getElementsByTagName("tr");
  for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    var cols = rows[rowIndex].getElementsByTagName("td");
    for (var cellIndex = 0; cellIndex < cols.length; cellIndex++) {
      var cell   = cols[cellIndex];
      var marble = cell.children[0];
      if (marble.className === MARBLE_CLASS.CLEAR) {
        clearCells.push(marble)
      }
    }
  }
  return clearCells[random(clearCells.length - 1)];
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