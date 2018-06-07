import React, { Component } from 'react';
import Canvas from 'react-native-canvas';
import { connect } from 'react-redux'
import { View, Dimensions } from 'react-native';
import goTroughArray from '../Functions/yNumbersConverter';

const {height, width} = Dimensions.get('window');


class CanvasComponent extends Component {
  state = { arr: this.props.arr_klika_vreme.reverse() }
  
  handleCanvas(canvas) {
    // check if canvase in use (error handling)
    if (canvas) { 
      canvas.height = 220;
      canvas.width = width-40;
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(20, 20);
      ctx.lineWidth = 2;
      ctx.lineTo(20, 200);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(10, 190);
      ctx.lineWidth = 2;
      ctx.lineTo(width - 10, 190);
      ctx.stroke();
      for (let i = 1; i <= 10; i++) { 
        //x points
        ctx.beginPath();
        ctx.moveTo(20+25*i, 185);
        ctx.lineWidth = 1;
        ctx.lineTo(20+25*i, 195);
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.stroke();
        // grid x
        ctx.beginPath();
        ctx.moveTo(20+25*i, 20);
        ctx.lineWidth = 1;
        ctx.lineTo(20+25*i, 195);
        ctx.strokeStyle = 'rgba(0,0,0,.3)';
        ctx.stroke();
      }

      for (let i = 1; i <= 10; i++) {
        //x points small
        ctx.beginPath();
        ctx.moveTo(20+25*i-25/2, 187);
        ctx.lineWidth = 1;
        ctx.lineTo(20+25*i-25/2, 193);
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.stroke();
      }

      for (let i = 1; i <= 6; i++) { 
        //y points
        ctx.beginPath();
        ctx.moveTo(25, 190-25*i);
        ctx.lineWidth = 1;
        ctx.lineTo(15, 190-25*i);
        ctx.stroke();
        // grid y
        ctx.beginPath();
        ctx.moveTo(width-50, 190-25*i);
        ctx.lineWidth = 1;
        ctx.lineTo(15, 190-25*i);
        ctx.strokeStyle = 'rgba(0,0,0,.3)';
        ctx.stroke();
      }

      for (let i = 1; i <= 6; i++) { 
        //y points small
        ctx.beginPath();
        ctx.moveTo(23, 190-25*i+25/2);
        ctx.lineWidth = 1;
        ctx.lineTo(17, 190-25*i+25/2);
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.stroke();
      }

      ctx.font = '10px arial';  // text
      ctx.fillText('Seconds', 30, 30);
      ctx.fillText('Clicks', width - 70, 180);

      for (let i = 1; i <= 10; i++) {  // numbers on x
        ctx.fillText( i , 20+25*i-10, 205);
      }

      for (let i = 1; i <= 6; i++) {  // numbers on y
        ctx.fillText( i*2 , 5, 190-25*i+10);
      }


      let ipsilon = 190; // y axis on the start, witch translates to be the center of the xy plane
      for (let i = 0; i < this.state.arr.length; i++) {   //chart
        ctx.beginPath();
        ctx.moveTo(20+25*(i), ipsilon);
        if (!this.state.arr[i-1]) {
          ipsilon = goTroughArray(this.state.arr[i]);
        }
        else if (this.state.arr[i]) {
          ipsilon = goTroughArray(this.state.arr[i]-this.state.arr[i-1]);
        }
        else {
          i = 10;
        }
        ctx.lineWidth = 1;
        ctx.lineTo(20+25*(i+1), ipsilon);
        ctx.stroke();

        //dots
        ctx.beginPath();
        ctx.arc(20+25*(i+1),ipsilon,2,0,2*Math.PI);
        ctx.fill();
      }
    } 
  }

  // rendering canvas if the arr contains results
  renderCanvas() {
    if (this.props.arr_klika_vreme) {
      return (
        <Canvas ref={this.handleCanvas.bind(this)}/>
      );
    }
    return ( <View /> )
  }
  render() {
    return (
      <View>
        { this.renderCanvas() }
      </View>
    )
  }
}

const mapStateToProps = ({ proces }) => {
  const { arr_klika_vreme } = proces;

  return { arr_klika_vreme };
};

export default connect(mapStateToProps, null)(CanvasComponent);