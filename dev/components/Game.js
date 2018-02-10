import React from 'react';
import './Game.css';
import _ from 'underscore';
import scoreboard from './scoreboard';

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      building: [{
        xAxis: 0,
        width: 50
      },{
        xAxis: 80,
        width: 30
      },{
        xAxis: 480,
        width: 40
      }],
      count: 0,
      angle: 0,
      statexAxisOne: 80,
      flowing: false,
      score: 0,
      horizontalMove: false
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }
  
  componentAddEventListener() {
    let el =document.querySelector(".mainDiv");
    el.addEventListener("mousedown", this.onMouseDown);
    el.addEventListener("mouseup", this.onMouseUp);
  }

  componentDidMount() {
    this.componentAddEventListener();
  }

  buildingHorizontalMove() {
    let objThis  = this;
    let countOne = 0, countTwo= 0, countThree = 0;
    let buildingThreeState = Math.floor(Math.random() * 300) + 80;
    let maximum = (this.state.building[1].xAxis > this.state.building[0].width) ? this.state.building[1].xAxis : this.state.building[0].width;
    for (var max = 0, min = maximum*-1; max >= min; max--) {
      (function(index) {
        countOne += 1;
        setTimeout(function() {
          this.setState({
            building: [{
              xAxis: index,
              width: this.state.building[0].width
            },{
              xAxis: maximum+index,
              width: this.state.building[1].width
            },{
              xAxis: 480,
              width: this.state.building[2].width
            }]
          });
        }.bind(objThis), countOne * 10);
      })(max);
    }

    //new building created and moving into the location of building-two...
    let promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        for (var max = 480, min = buildingThreeState; max >= min; max--) {
          (function(index) {
            countThree += 1;
            setTimeout(function() {
              this.setState({
                building: [{
                  xAxis: this.state.building[0].xAxis,
                  width: this.state.building[0].width
                },{
                  xAxis: this.state.building[1].xAxis,
                  width: this.state.building[1].width
                },{
                  xAxis: index,
                  width: this.state.building[2].width
                }]
              });
            }.bind(objThis), countThree * 5);
          })(max);
        }
        setTimeout(function() {
          resolve({
            newBuildingWidth: Math.floor(Math.random() * 70) + 20,
            newBuildingxAxis: 480,
            // check: this.state.building[1].xAxis
          });
        }, (480-buildingThreeState+1) * 5);
      }, this.state.building[1].xAxis * 12);
      
    }.bind(this));
    promise.then(function(value) { 
      let newBuilding = {xAxis: value.newBuildingxAxis, width: value.newBuildingWidth}
      this.setState({
        horizontalMove: false,
        count: 0,
        building: [...this.state.building.slice(1), newBuilding],
        statexAxisOne: this.state.building[2].xAxis
      });
      this.componentAddEventListener();
    }.bind(this)).catch(function() {
      console.log("catch");
    });
  }

  createLadder() {
    let count = this.state.count + 1;
    this.setState({ count: count, flowing: false });
  }
  
  onMouseDown() {
    this.setState({ count: 0, flowing: false, horizontalMove: false });
    this.intervalId = setInterval(this.createLadder.bind(this), 10);
  }

  placedCorrect(objThis) {
    for (var i = 1; i <= 91; i++) {
      (function(index) {
        setTimeout(function() {
          if (index == 91) {
            this.buildingHorizontalMove();
            this.setState({ horizontalMove: true, score: this.state.score + 1 });
          } else {
            this.setState({ angle: index, flowing: true });
          }
        }.bind(objThis), index * 10);
      })(i);
    }
  }

  placedBefore(objThis) {
    for (var i = 1; i <= 180; i++) {
      (function(index) {
        setTimeout(function() {
          this.setState({ angle: index, flowing: true });
        }.bind(objThis), index * 10);
      })(i);
    }
  }

  placedBeyond(objThis) {
    for (var i = 1; i <= 90; i++) {
      (function(index) {
        setTimeout(function() {
          this.setState({ angle: index, flowing: true });
        }.bind(objThis), index * 10);
      })(i);
    }
  }

  ladderFall(status) {
    if (status == "placedcorrect") {
      this.placedCorrect(this);
    } else if (status == "placedbefore") {
      this.placedBefore(this);
    } else if (status == "placedbeyond") {
      this.placedBeyond(this);
    }
  }

  onMouseUp() {
    clearInterval(this.intervalId);
    let el = document.querySelector(".mainDiv");
    let ladderLength = this.state.count;
    let buildingTwoxAxis = this.state.building[1].xAxis;
    let buildingOneWidth = this.state.building[0].width;
    let buildingTwoWidth = this.state.building[1].width;
    if ((ladderLength + buildingOneWidth) > buildingTwoxAxis && (ladderLength + buildingOneWidth) < (buildingTwoxAxis + buildingTwoWidth)) {
      this.ladderFall("placedcorrect");
    } else if ((ladderLength + buildingOneWidth) < buildingTwoxAxis) {
      this.ladderFall("placedbefore");
    } else if ((ladderLength + buildingOneWidth) > (buildingTwoxAxis + buildingTwoWidth)) {
      this.ladderFall("placedbeyond");
    }
    el.removeEventListener("mousedown", this.onMouseDown);
    el.removeEventListener("mouseup", this.onMouseUp);
    // this.debounceOnmouseDown = _.debounce(this.debounceOnmouseDown, 1000);
  }

  render() {
    let xLadderPosition = this.state.building[0].width;
    let xLadderPositionOnMove = this.state.building[1].xAxis;
    let count = this.state.count;
    let angle = this.state.angle;
    let xAxisOne = this.state.statexAxisOne; // final xaxis position & not update with the state change
    let xCount = 0; 
    if (xLadderPositionOnMove !== xAxisOne) {
      xCount = xAxisOne - xLadderPositionOnMove;
    }
    let xTwo = count * Math.sin(angle * Math.PI / 180);
    let yTwo = count * Math.cos(angle * Math.PI / 180);
    let score = this.state.score;
    return ( 
      <div>
      <div className="mainDiv">
        <svg width="480" height="350"> 
          <line x1={xLadderPosition} y1={270} x2={xLadderPosition} y2={270-count} stroke="red" visibility={(this.state.flowing === false && this.state.horizontalMove === false) ? 'visible' : 'hidden'}/>
          <line x1={xLadderPosition} y1={270} x2={xLadderPosition+xTwo} y2={270-yTwo} stroke="red" visibility={(this.state.flowing === true && this.state.horizontalMove === false) ? 'visible' : 'hidden'}/>
          <line x1={xLadderPosition - xCount} y1={270} x2={(count+xLadderPosition)-xCount} y2={270-yTwo} stroke="red" visibility={(this.state.flowing === true && this.state.horizontalMove === true) ? 'visible' : 'hidden'}/>
          {this.state.building.map(function(item, index) {
            return (<rect key={index} x={item.xAxis} y="270" width={item.width} height="80" fill="black"/>)
          })}
        </svg>
      </div>
      <div className="scoreBoard">
        <div>score: {score}</div>
      </div>
      </div>
    )
  }
  
}


