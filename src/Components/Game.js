import React, { Component } from 'react';
import './Game.css';

class Game extends Component {
  componentDidMount(){
    window.init()
  }
  render(){
    return (
      <div className="Game">
        <table class="table"></table>
        <div class="next-marbles">
          <div class="next-marble">Next:</div>
          <div id="next-0" class="next-marble"></div>
          <div id="next-1" class="next-marble"></div>
          <div id="next-2" class="next-marble"></div>
        </div>
      </div>
    );
  }
}

export default Game;
