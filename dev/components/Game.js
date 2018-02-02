import React from 'react';
import _ from 'underscore';
import './Game.css';

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
      flowing: false
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
  }

  onMouseClick() {
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
            newBuildingxAxis: 480
          });
        }, (480-buildingThreeState+1) * 5);
      }, this.state.building[1].xAxis * 12);
      
    }.bind(this));
    promise.then(function(value) { 
      let newBuilding = {xAxis: value.newBuildingxAxis, width: value.newBuildingWidth}
      this.setState({
        building: [...this.state.building.slice(1), newBuilding]
      });
    }.bind(this)).catch(function() {
      console.log("catch");
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
  
  onMouseDown() {
    this.intervalId = setInterval(this.createLadder.bind(this), 10);
  }

  onMouseUp() {
    clearInterval(this.intervalId);
    let counts = this.state.count;
    this.ladderFall(counts);
  }

  render() {
    // console.log(this.state.building);
    return ( 
      <div className="mainDiv" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onClick={this.onMouseClick}>
        <svg width="480" height="350"> 
          {this.state.building.map(function(item, index) {
            return (<rect key={index} x={item.xAxis} y="270" width={item.width} height="80" fill="black"/>)
          })}
        </svg>
      </div>
    )
  }
  
}
