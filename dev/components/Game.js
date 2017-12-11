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
    // this.onMouseClick = this.onMouseClick.bind(this);
  }

  /*componentDidMount() {
    this.onMouseDown();
  }*/

  /*componentWillUnmount(){
    this.onMouseUp();
  }*/

  timer(count) {
    const objThis  = this;
    for (var i = 1; i <= 90; i++) {
      (function(index) {
        setTimeout(function() {
          this.setState({ count: count, angle: index, flowing: true });
        }.bind(objThis), count * 100);
      })(i);
    }
  }

  createLadder() {
    let count = this.state.count + 1;
    this.setState({ count: count, flowing: false });
  }

  onMouseDown() {
    this.intervalId = setInterval(this.createLadder.bind(this), 200);
  }

  onMouseUp() {
    clearInterval(this.intervalId);
    let count = this.state.count * 5;
    this.timer(count);
  }

  render() {
    let count = (this.state.count * 5);
    let angle = this.state.angle;
    var xTwo = 90 * Math.sin(angle * Math.PI / 180);
    var yTwo = 90 * Math.cos(angle * Math.PI / 180);
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