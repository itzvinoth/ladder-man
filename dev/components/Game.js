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
      xAxisBuildingThree: 480,
      widthBuildingOne: 50,
      widthBuildingTwo: 30,
      widthBuildingThree: 40,
      flowing: false
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
  }

  onMouseClick() {
    let objThis  = this;
    let countOne = 0, countTwo= 0, countThree = 0;
    
    this.setState(function(prevState) {
      let buildingTwoWidth = prevState.widthBuildingThree;
      let buildingOneWidth = ((prevState.widthBuildingTwo === 30) ? 50 : prevState.widthBuildingTwo)
      // console.log(prevState.widthBuildingOne);
      buildingOneWidth = buildingOneWidth * -1;
      let buildingTwoState = (prevState.xAxisBuildingThree === 480) ? prevState.xAxisBuildingTwo : prevState.xAxisBuildingThree;
      let buildingThreeState = Math.floor(Math.random() * 300) + 80;

      //building-one moving out of focus...widthBuildingOne
      function first(index) {
        setTimeout(function() {
          this.setState({
            xAxisBuildingOne: index
          });
        }.bind(objThis), countOne * 10);  
      }
      let promise = new Promise(function(resolve, reject) {
        for (var max = 0, min = buildingOneWidth; max >= min; max--) {
          (function(index) {
            countOne += 1;
            first(index);
          })(max);
        }
        resolve({
          widthBuildingTwo: prevState.widthBuildingThree,
          widthBuildingOne: prevState.widthBuildingTwo
        });
      });
      promise.then(function(value) { 
        /* do something with the result */
        console.log(value);
        this.setState({
          widthBuildingTwo: value.widthBuildingTwo,
          widthBuildingOne: value.widthBuildingOne
        });
      }.bind(this)).catch(function() {
        console.log("catch");
      });

      //After timeout building-two moving into the location of building-one...
      for (var max = buildingTwoState, min = 0; max >= min; max--) {
        (function(index) {
          countTwo += 1;
          setTimeout(function() {
            this.setState({
              xAxisBuildingTwo: index
            });
          }.bind(objThis), countTwo * 10);
        })(max);
      }

      setTimeout(function() {
        for (var max = 480, min = buildingThreeState; max >= min; max--) {
          (function(index) {
            countThree += 1;
            setTimeout(function() {
              this.setState({
                xAxisBuildingThree: index
              });
            }.bind(objThis), countThree * 5);
          })(max);
        }
      }, buildingTwoState* 12);

      return {
        widthBuildingThree: Math.floor(Math.random() * 70) + 20
      }
    });    

    //new building created and moving into the location of building-two...
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
    const { xAxisBuildingOne, xAxisBuildingTwo, xAxisBuildingThree, widthBuildingOne, widthBuildingTwo, widthBuildingThree} = this.state;
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