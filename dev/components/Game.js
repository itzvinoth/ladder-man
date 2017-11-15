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
    this.setState({ count: this.state.count + 1 });
    // console.log(this.state.count);
  }

  onMouseDown() {
    this.setState({ count: 0 });
    this.intervalId = setInterval(this.timer.bind(this), 200);
  }

  onMouseUp() {
    // this.setState({ count: 0 });
    clearInterval(this.intervalId);
  }

  render() {
    let count = this.state.count;
    const lineStyle = {
      background: '#000000',
      width: '2px',
      height: 0,
      marginLeft: '38px',
      marginTop: '124px',
      bottom: '112px',
      position: 'absolute'
    };
    lineStyle.height = (this.state.count*10) + 'px';
    return ( 
      
      <div className="mainDiv">
        <div className='ladderDiv'><img src={LadderImg} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} /></div>
        <div className='gameDiv'>
          <div className="man"></div>
          <div style={lineStyle}></div>
          <div className="currBuilding">
            
          </div>
        </div>
    </div>
    )
  }
  
}
