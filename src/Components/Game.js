import React, { Component } from 'react';
import p5 from 'p5';
import './Game.css';
import "../game/script"
import { getSketch } from '../game/sketch';

export default class Game extends Component {
  constructor(props){
    super(props);
    this.placeholderRef = React.createRef();
  }
  componentDidMount() {
    new p5(getSketch, this.placeholderRef.current);
  }
  render() {
    return (
      <div ref={this.placeholderRef}> </div>
    );
  }
}


