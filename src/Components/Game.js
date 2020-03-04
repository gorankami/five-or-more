import React, { Component } from 'react';
import './Game.css';
import "../game/script"

class Game extends Component {
  componentDidMount(){
    window.init()
  }
  render(){
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

export default Game;
