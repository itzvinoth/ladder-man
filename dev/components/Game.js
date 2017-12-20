import React from 'react';
import _ from 'underscore';
import './Game.css';

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      angle: 0,
      xAxisBuildingOne: 0,
      xAxisBuildingTwo: 80,
      widthBuildingOne: 50,
      widthBuildingTwo: 30,
      xAxisBuildingThree: 480,
      widthBuildingThree: 50,
      flowing: false
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
  }

  componentDidMount() {
    this.constructBuilding();
  }

  /*componentWillUnmount(){
    this.onMouseUp();
  }*/

  onMouseClick() {
    let objThis  = this;
    var count = 0, nextCount= 0, firstCount = 0;
    let buildingTwoState = Math.floor(Math.random() * 300) + 80;
    this.setState(function(prevState) {
      
      let buildingTwoWidth = prevState.widthBuildingTwo;
      let buildingOneWidth = prevState.widthBuildingOne * -1;
      //building-one moving out of focus...
      for (var max = 0, min = buildingOneWidth; max >= min; max--) {
        (function(index) {
          firstCount += 1;
          setTimeout(function() {
            this.setState({
              xAxisBuildingOne: index
            });
          }.bind(objThis), firstCount * 10);
        })(max);
      }
    });
    
    //new building created and moving in to the location of building-two...
    for (var max = 480, min = buildingTwoState; max >= min; max--) {
      (function(index) {
        count += 1;
        setTimeout(function() {
          this.setState({ 
            xAxisBuildingTwo: index
          });
        }.bind(objThis), count * 5);
      })(max);
    }
    //After timeout building-two moving in to the location of building-one...
    // setTimeout(function() {
      // console.log(this.state.widthBuildingTwo);
      /*for (var i = buildingTwoState, min = 0; i >= min; i--) {
        (function(index) {
          nextCount += 1;
          setTimeout(function() {
            this.setState({ 
              xAxisBuildingOne: index
            });
          }.bind(objThis), nextCount * 5);
        })(i);
      }*/
    // }.bind(objThis), 0);

    this.setState(function(prevState) {
      let buildingTwoState = prevState.xAxisBuildingTwo;
      for (var max = buildingTwoState, min = 0; max >= min; max--) {
        (function(index) {
          nextCount += 1;
          setTimeout(function() {
            this.setState({
              xAxisBuildingOne: index
            });
          }.bind(objThis), nextCount * 10);
        })(max);
      }
    });
    
    this.setState(function(prevState) {
      return {
        widthBuildingOne: prevState.widthBuildingTwo,
        widthBuildingTwo: Math.floor(Math.random() * 70) + 20, 
      }
    });
  }

  ladderFall(count) {
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

  constructBuilding() {
    /*setInterval(function() {
      this.setState({ 
        xAxisBuildingOne: 0,
        xAxisBuildingTwo: Math.floor(Math.random() * (380 - 80)) + 80,
        widthBuildingOne: Math.floor(Math.random() * 50) + 20,
        widthBuildingTwo: Math.floor(Math.random() * 70) + 20, 
      })
    }.bind(this), 3000);*/
  }

  onMouseDown() {
    this.intervalId = setInterval(this.createLadder.bind(this), 10);
  }

  onMouseUp() {
    clearInterval(this.intervalId);
    let counts = this.state.count;
    this.ladderFall(counts);
  }

  /*render() {
    let count = this.state.count;
    let angle = this.state.angle;
    let xTwo = count * Math.sin(angle * Math.PI / 180);
    let yTwo = count * Math.cos(angle * Math.PI / 180);
    return ( 
      
      <div className="mainDiv" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
        <svg width="480" height="350"> 
            <rect x="0" y="270" width="50" height="80" fill="black"/>
            <line x1={50} y1={270} x2={50} y2={270-count} stroke="red" visibility={(this.state.flowing === false) ? 'visible' : 'hidden'}/>
            <line x1={50} y1={270} x2={50+xTwo} y2={270-yTwo} stroke="red" visibility={(this.state.flowing === true) ? 'visible' : 'hidden'}/>
          </svg>
    </div>
    )
  }*/
  render() {
    let xAxisBuildingOne = this.state.xAxisBuildingOne;
    let xAxisBuildingTwo = this.state.xAxisBuildingTwo;
    let widthBuildingOne = this.state.widthBuildingOne;
    let widthBuildingTwo = this.state.widthBuildingTwo;
    let xAxisBuildingThree = this.state.xAxisBuildingThree;
    let widthBuildingThree = this.state.widthBuildingThree;

    return ( 
      <div className="mainDiv" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onClick={this.onMouseClick}>
        <svg width="480" height="350"> 
            <rect x={xAxisBuildingOne} y="270" width={widthBuildingOne} height="80" fill="black"/>
            <rect x={xAxisBuildingTwo} y="270" width={widthBuildingTwo} height="80" fill="black"/>
            <rect x={xAxisBuildingThree} y="270" width={widthBuildingThree} height="80" fill="black"/>
          </svg>
      </div>
    )
  }
  
}