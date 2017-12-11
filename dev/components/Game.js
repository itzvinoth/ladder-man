import React from 'react';
import _ from 'underscore';
import LadderImg from './images/ladder.png';
import './Game.css';

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      angle: 0,
      flowing: false
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  /*componentDidMount() {
    this.onMouseDown();
  }*/

  /*componentWillUnmount(){
    this.onMouseUp();
  }*/

  ladderSlop(count) {
    const objThis  = this;
    for (var i = 1; i <= 90; i++) {
      (function(index) {
        setTimeout(function() {
          this.setState({ angle: index, flowing: true });
        }.bind(objThis), index * 10);
      })(i);
    }
  }

  createLadder() {
    let count = this.state.count + 1;
    this.setState({ count: count, flowing: false });
  }

  onMouseDown() {
    this.intervalId = setInterval(this.createLadder.bind(this), 10);
  }

  onMouseUp() {
    clearInterval(this.intervalId);
    let counts = this.state.count;
    this.ladderSlop(counts);
  }

  render() {
    let count = this.state.count;
    let angle = this.state.angle;
    var xTwo = count * Math.sin(angle * Math.PI / 180);
    var yTwo = count * Math.cos(angle * Math.PI / 180);
    return ( 
      
      <div className="mainDiv" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
        <svg width="480" height="350"> 
            <rect x="0" y="270" width="50" height="80" fill="black"/>
            <line x1={50} y1={270} x2={50} y2={270-count} stroke="red" visibility={(this.state.flowing === false) ? 'visible' : 'hidden'}/>
            <line x1={50} y1={270} x2={50+xTwo} y2={270-yTwo} stroke="red" visibility={(this.state.flowing === true) ? 'visible' : 'hidden'}/>
          </svg>
    </div>
    )
  }
  
}