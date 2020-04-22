
import React from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.js';

export default class Sketch extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  Sketch = (p) => {

     p.setup = () => {
      p.createCanvas(200, 200);
     }

     p.draw = () => {
      p.background(0);
      p.fill(255);
      p.rect(100,100,50,50);
     }
  }

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current)
  }

  render() {
    return (
      <div ref={this.myRef}>

      </div>
    )
  }
}