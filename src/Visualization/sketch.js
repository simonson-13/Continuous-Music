
import React from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.js';

var stars = [];
var speed =5;

var serial;
var latestData = "waiting for data";
var input1;
var pitch;
var input2;
var speedx = 1;
var pitchx = 1 ;
var input3 = 1;
var input3x = 0;
var bgc = 0;
var bgcx;

let kMax;
let step;
let n = 100; // number of blobs
let radius = 0; // diameter of the circle
let inter = 0.05; // difference between the sizes of two blobs
let maxNoise = 500;
let lapse = 0;    // timer
let noiseProg = (x) => (x);


const triangleNum = 5
const noiseAngleTimes = 5
const noiseScale = 0.003
let rotVertexes = []
let playing = true
let color = ["#C05021", "#FFBA08", "#20A440", "#2F7ED3", "#D79FE1"]

export default class Sketch extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  Sketch = (p) => {

    p.setup = () => {

      p.createCanvas(1112, 834);
      var star = new Star();
      for (var i = 0; i < 1600; i++) {
        stars[i] = new Star();
      }
      p.colorMode(p.HSB, 360, 100, 100, 100)
      p.strokeWeight(2)
      p.strokeJoin(p.ROUND)
      rotVertexes = [new RotationVertex(1), new RotationVertex(1), new RotationVertex(-1)]
     
     }

     p.draw = () => {
      p.background(0);
      p.fill(255);
      p.rect(100,100,50,50);
      for (var i = 0; i < stars.length; i++) {
      stars[i].update();
        stars[i].show();
      }

      if(true) {
        p.push()
        p.translate(p.width/2, p.height/2)
        for(let i = 0; i < triangleNum; i++) {
          let col = color[i%5]
          p.drawTriangle(
            rotVertexes[0].getVector((i/triangleNum + p.frameCount*p.TWO_PI/360/2)%1),
            rotVertexes[1].getVector((i/triangleNum + p.frameCount*p.TWO_PI/360/2)%1),
            rotVertexes[2].getVector((i/triangleNum + p.frameCount*p.TWO_PI/360/2)%1),
            col
          )
        }
        p.pop()

        for(let i=0; i<rotVertexes.length; i++) {
          rotVertexes[i].update(p.frameCount)
        }
      }
    }
    
    class Star {
        constructor() {
          this.x = p.random(-p.width, p.width);
            this.y = p.random(-p.height, p.height);
            this.z = p.random(p.width);      
            this.pz = this.z;

        }
        update() {
          this.z = this.z - speed;
          if (this.z < 1) {
            this.z = p.width;
            this.x = p.random(-p.width, p.width);
            this.y = p.random(-p.height, p.height);
            this.pz = this.z;
          }
        }
      
        show() {
          p.fill(255);
          p.noStroke();
          
          var sx = p.map(this.x/this.z, 0, 1, 0, p.width);
          var sy = p.map(this.y/this.z, 0, 1, 0, p.height);
          var r = p.map(this.z, 0, p.width, 8, 0);
          p.ellipse(sx, sy, r, r);    
          
          var px = p.map(this.x/this.pz, 0, 1, 0, p.width);
          var py = p.map(this.y/this.pz, 0, 1, 0, p.height);
          this.pz = this.z;
          
          p.stroke(255);
          p.line(px, py, sx, sy);
        }
    }
    function drawTriangle(vec1, vec2, vec3, col) {
      let center = p5.Vector.add(vec1, vec2)
      center = p5.Vector.add(center, vec3)
      center.div(3)
      let miniVec1 = p5.Vector.add(vec1, center), miniVec2 = p5.Vector.add(vec2, center), miniVec3 = p5.Vector.add(vec3, center)
      miniVec1.div(2)
      miniVec2.div(2)
      miniVec3.div(2)

      let vecs = [vec1, vec2, vec3]
      let miniVecs = [miniVec1, miniVec2, miniVec3]
      p.noFill()
      p.stroke(col)
      for(let i=0; i<3; i++) {
        p.beginShape()
        p.vertex(miniVecs[i].x, miniVecs[i].y)
        p.vertex(vecs[i].x, vecs[i].y)
        p.vertex(vecs[(i+1)%3].x, vecs[(i+1)%3].y)
        p.endShape(p.CLOSE)
      }
      for(let i=0; i<3; i++) {
        p.beginShape()
        p.vertex(center.x, center.y)
        p.vertex(miniVecs[i].x, miniVecs[i].y)
        p.vertex(vecs[(i+1)%3].x, vecs[(i+1)%3].y)
        p.endShape(p.CLOSE)
      }

      p.triangle(vec1.x, vec1.y, vec2.x, vec2.y, vec3.x, vec3.y)
    }

    class RotationVertex {
      constructor(wise) {
        this.seed = p.random(1000)
        p.noiseSeed(this.seed)
        this.center = p.createVector(0, 0)
        this.radius = p.noise(0) * 400
        this.initAngle = p.noise(1000) * p.TWO_PI * noiseAngleTimes
        this.clockWise = wise
      }

      update(tick) {
        p.noiseSeed(this.seed)
        this.radius = p.noise(tick*noiseScale) * 400
        this.initAngle = p.noise(1000 + tick*noiseScale) * p.TWO_PI * noiseAngleTimes
      }

      getVector(rotRatio) {
        let x = this.center.x + this.radius*p.cos(this.initAngle + this.clockWise * rotRatio*p.TWO_PI)
        let y = this.center.y + this.radius*p.sin(this.initAngle + this.clockWise * rotRatio*p.TWO_PI)
        return p.createVector(x, y)
      }
    }
    function componentDidMount() {
      this.myP5 = new p5(this.Sketch, this.myRef.current)
    }
  }



  render() {
    return (
      <div ref={this.myRef}>

      </div>
    );
  }
}