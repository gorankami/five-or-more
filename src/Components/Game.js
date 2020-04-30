import React, { Component } from 'react';
import p5 from 'p5';
import './Game.css';
import "../game/tableOperations"
import { getSketch } from '../game/sketch';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.placeholderRef = React.createRef();
  }
  componentDidMount() {
    try {
      this.p5Game = new p5(getSketch, this.placeholderRef.current);
    } catch (err) {
      console.error("Game Mount: Failed to instatiate p5 sketch", JSON.stringify(err, null, 2))
    }
  }


  componentWillUnmount() {
    try {
      this.p5Game.remove();
    } catch (err) {
      console.error('Game Unmount: Failed to remove p5 sketch', JSON.stringify(err, null, 2));
    }
  }

  render() {
    return (
      <div ref={this.placeholderRef}> </div>
    );
  }
}


