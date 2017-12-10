import React from 'react';
import _ from 'underscore';
import LadderImg from './images/ladder.png';
import './Game.css';

export default class Game extends React.Component {

  constructor(props) {
  	super(props);
    this.state = {
      count: 0
    };
  	this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    // this.timer = this.timer.bind(this);
  }

  /*componentDidMount() {
    this.onMouseDown();
  }*/

  /*componentWillUnmount(){
    this.onMouseUp();
  }*/

  timer() {
    // this.setState({ count: this.state.count + 1 });
    const objThis  = this;
    for (var i = 1; i <= 90; i++) {
      (function(index) {
        // console.log(this.state.count);
        setTimeout(function() {
          // let count = this.state.count + 1;
          this.setState({ count: index });
          // doSetTimeout(index);
        }.bind(objThis), index * 10);
      })(i);
    }
    // console.log(this.state.count);
  }

  onMouseDown() {
    this.setState({ count: 0 });
    // this.intervalId = setInterval(this.timer.bind(this), 200);
    this.timer();
  }

  onMouseUp() {
    // this.setState({ count: 0 });
    // clearInterval(this.intervalId);
  }

  render() {
    let count = this.state.count;
    var xTwo = 90 * Math.sin(count * Math.PI / 180);
    var yTwo = 90 * Math.cos(count * Math.PI / 180);
    return ( 
      
      <div className="mainDiv">
        <div className='ladderDiv'><img src={LadderImg} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} /></div>
        <div className='gameDiv'>
          <div className="man"></div>
          <svg>
            <line x1={0} y1={0} x2={xTwo} y2={yTwo} stroke="red"></line>
          </svg>
          <div className="currBuilding">
            
          </div>
        </div>
    </div>
    )
  }
  
}
