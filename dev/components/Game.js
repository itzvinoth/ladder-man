import React from 'react';
import _ from 'underscore';
import LadderImg from './images/ladder.png';
import './Game.css';

export default class Game extends React.Component {
  constructor(props) {
  	super(props);
  	this.createLadder = this.createLadder.bind(this);
  }

  createLadder() {
  	
  }

  render() {
    return ( 
      <div className="mainDiv">
        <div className='ladderDiv'><img src={LadderImg} onClick={this.createLadder}/></div>
        <div className='gameDiv'>
          <div className="man"></div>
          <div className="currBuilding">
            
          </div>
        </div>
    </div>
    )
  }
  
}
