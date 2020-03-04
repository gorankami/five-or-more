import React, { Component } from 'react';
import p5 from 'p5';
import './Game.css';
import "../game/script"
import { getSketch } from '../game/sketch';

export default class Game extends Component {
  componentDidMount() {
    new p5(getSketch, document.getElementById('p5sketch'));
  }
  render() {
    return (
      <div>

      </div>
    );
  }
}


