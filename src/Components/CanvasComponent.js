import React, { Component } from 'react';
import Canvas from 'react-native-canvas';
import { connect } from 'react-redux'
import { View, Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');


function goTroughArray(arr) {
    if (Math.round(arr) == 0) { return 190; }
    else if (Math.round(arr) == 1) { return 165+25/2; }
    else if (Math.round(arr) == 2) { return 165; }
    else if (Math.round(arr) == 3) { return 140+25/2; }
    else if (Math.round(arr) == 4) { return 140; }
    else if (Math.round(arr) == 5) { return 115+25/2; }
    else if (Math.round(arr) == 6) { return 115; }
    else if (Math.round(arr) == 7) { return 90+25/2; }
    else if (Math.round(arr) == 8) { return 90; }
    else if (Math.round(arr) == 9) { return 65+25/2; }
    else if (Math.round(arr) == 10) { return 65; }
    else if (Math.round(arr) == 11) { return 40+25/2; }
    else if (Math.round(arr) == 12) { return 40; }   
    else if (Math.round(arr) == 13) { return 15+25/2; }
    else if (Math.round(arr) == 14) { return 15; }
    else { return 0; }
}

class CanvasComponent extends Component {
  state = { arr: this.props.arr_klika_vreme.reverse() }

  componentDidMount() {
    
  }
  
  handleCanvas(canvas) {
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
      for (let i = 1; i <= 10; i++) { //x points
        ctx.beginPath();
        ctx.moveTo(20+25*i, 185);
        ctx.lineWidth = 1;
        ctx.lineTo(20+25*i, 195);
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(20+25*i, 20);
        ctx.lineWidth = 1;
        ctx.lineTo(20+25*i, 195);
        ctx.strokeStyle = 'rgba(0,0,0,.3)';
        ctx.stroke();
      }

      for (let i = 1; i <= 10; i++) { //x points small
        ctx.beginPath();
        ctx.moveTo(20+25*i-25/2, 187);
        ctx.lineWidth = 1;
        ctx.lineTo(20+25*i-25/2, 193);
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.stroke();
      }

      for (let i = 1; i <= 6; i++) { //y points
        ctx.beginPath();
        ctx.moveTo(25, 190-25*i);
        ctx.lineWidth = 1;
        ctx.lineTo(15, 190-25*i);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(width-50, 190-25*i);
        ctx.lineWidth = 1;
        ctx.lineTo(15, 190-25*i);
        ctx.strokeStyle = 'rgba(0,0,0,.3)';
        ctx.stroke();
      }

      for (let i = 1; i <= 6; i++) { //y points small
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

      for (let i = 1; i <= 10; i++) {  // brojevi na x
        ctx.fillText( i , 20+25*i-10, 205);
      }

      for (let i = 1; i <= 6; i++) {  // brojevi na y
        ctx.fillText( i*2 , 5, 190-25*i+10);
      }


      let ipsilon = 190;
      for (var i = 0; i <= 9; i++) {   //chart
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
      }
    } 
  }

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