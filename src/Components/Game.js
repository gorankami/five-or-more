import React, { Component } from 'react';
import './Game.css';
import "../game/script"
import { setThreeRandomMarbleClasses, setThreeRandomMarbles, click } from '../game/script';
import { CELL_CLASS } from '../game/CELL_CLASS';
import { MARBLE_CLASS } from '../game/MARBLE_CLASS';


let tableWidth = 9,
  tableHeight = 9;
let tableMatrix = [];
let table       = [];

export default class Game extends Component {
  componentDidMount() {
    setThreeRandomMarbleClasses();
    let tableElement = document.getElementsByTagName("table")[0];

    for (let i = 0; i < tableHeight; i++) {
      let row = document.createElement("tr");
      tableElement.appendChild(row);
      let tableRow = [];
      for (let j = 0; j < tableWidth; j++) {
        let cell = document.createElement("td");
        //set coordinates
        cell.dataset.x = j;
        cell.dataset.y = i;
        cell.className = CELL_CLASS.CLEAR;

        let marble = document.createElement("div");
        marble.className = MARBLE_CLASS.CLEAR;
        marble.onclick = click(table);
        cell.appendChild(marble);
        row.appendChild(cell);
        tableRow.push(cell);
        tableMatrix.push(cell);
      }
      table.push(tableRow);
    }
    setThreeRandomMarbles(table);
  }
  render() {
    return (
      <div className="Game">
        <table className="table"></table>
        <div className="next-marbles">
          <div className="next-marble">Next:</div>
          <div id="next-0" className="next-marble"></div>
          <div id="next-1" className="next-marble"></div>
          <div id="next-2" className="next-marble"></div>
        </div>
      </div>
    );
  }
}


