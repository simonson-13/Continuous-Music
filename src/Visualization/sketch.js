
import React from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.js';
import * as firebase from 'firebase'; // import firebase!

export default class Sketch extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.dbRef = firebase.database().ref();
    
    this.livePianoRef = this.dbRef.child('live').child('piano');
    this.liveCelloRef = this.dbRef.child('live').child('cello');
    this.liveTrumpetRef = this.dbRef.child('live').child('trumpet');
    this.liveGuitarRef = this.dbRef.child('live').child('guitar');
    this.liveXylophoneRef = this.dbRef.child('live').child('xylophone');
    
    this.pianoMidiNotes = [0];
    this.celloMidiNotes = [0];
    this.trumpetMidiNotes = [0];
    this.guitarMidiNotes = [0];
    this.xylophoneMidiNotes = [0];
  }

  Sketch = (p) => {
    var startValue = 0;
    var stars = [];
    var triangleNum = 5;
    var noiseAngleTimes = 5;
    var transparency = 0;
    var noiseScale = 0.006;
    var rotVertexes = [];
    let noiseProg = (x) => (x);
    //var color = ["#C05021", "#FFBA08", "#20A440", "#2F7ED3", "#D79FE1"];
    var colrgb = [[192,80,33],[225,186,8],[32,164,64],[47,126,211],[215,159,225]];
    //var serial;
    var particles = []
    var a = 0;
    var s = 0;
    var count = 0;
    var redrw = 0;
    var pressed = false;

    p.setup = () => {
      let canvas = p.createCanvas(this.props.width, this.props.height);
      canvas.position(0, 0);
      canvas.style('z-index', '-1');
      //var star = new Star();
      p.colorMode(p.HSB,100);
      p.noStroke();
      this.livePianoRef.on('value', snap => {
        this.pianoMidiNotes = snap.val();
        noiseScale = this.pianoMidiNotes.reduce((total,num) => total+num)/5000+.0015;
        transparency = this.pianoMidiNotes.reduce((total,num) => total+num)*10;
        if (noiseScale === 0) {
          noiseScale = .0015;
        }
        if (transparency === 0) {
          transparency = 0;
        }
      });

      this.liveCelloRef.on('value', snap => {
        this.celloMidiNotes = snap.val();
        noiseScale = this.celloMidiNotes.reduce((total,num) => total+num)/5000+.0015;
        transparency = this.celloMidiNotes.reduce((total,num) => total+num)*12;
        if (noiseScale === 0) {
          noiseScale = .0015;
        }
        if (transparency === 0) {
          transparency = 0;
        }
      });

      this.liveTrumpetRef.on('value', snap => {
        this.trumpetMidiNotes = snap.val();
        noiseScale = this.trumpetMidiNotes.reduce((total,num) => total+num)/5000+.0015;
        transparency = this.trumpetMidiNotes.reduce((total,num) => total+num)*12;
        if (noiseScale === 0) {
          noiseScale = .0015;
        }
        if (transparency === 0) {
          transparency = 0;
        }
      });

      this.liveGuitarRef.on('value', snap => {
        this.guitarMidiNotes = snap.val();
        noiseScale = this.guitarMidiNotes.reduce((total,num) => total+num)/5000+.0015;
        transparency = this.guitarMidiNotes.reduce((total,num) => total+num)*12;
        if (noiseScale === 0) {
          noiseScale = .0015;
        }
        if (transparency === 0) {
          transparency = 0;
        }
      });

      this.liveXylophoneRef.on('value', snap => {
        this.xylophoneMidiNotes = snap.val();
        noiseScale = this.xylophoneMidiNotes.reduce((total,num) => total+num)/5000+.0015;
        transparency = this.xylophoneMidiNotes.reduce((total,num) => total+num)*12;
        if (noiseScale === 0) {
          noiseScale = .0015;
        }
        if (transparency === 0) {
          transparency = 0;
        }
      });
      
      
    
      for (let i = 0; i < 400; i++) {
        stars[i] = new Star();
      }
      for (let i = 0; i < 10; i++) {
        particles[i] = new Clickable();
      }
      
   
      //p.colorMode(p.RGB, 255, 255, 255, 255)

      p.strokeWeight(2)
      p.strokeJoin(p.ROUND)

      rotVertexes = [new RotationVertex(1), new RotationVertex(1), new RotationVertex(-1)]
    }

    p.draw = () => {
      p.background(0);

      for (var iter = 0; iter<=p.width; iter+=5){
        p.fill((startValue+iter/30)%100,50,100);
        p.rect(iter,0,5,p.height);
      }
      startValue+=0.1;
      startValue%=100;

      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
          stars[i].show();
      }
      for (let i = 0; i < (transparency*2)+50; i++) {
        stars[i].update();
          stars[i].show();
      }
      for (let i=0; i<particles.length; i++){
        particles[i].drawNow();
      }
  
      p.push()
      p.translate(p.width/2, p.height/2)
      for(let i = 0; i < triangleNum; i++) {
        drawTriangle(
          rotVertexes[0].getVector((i/triangleNum + p.frameCount*p.TWO_PI/360/2)%1),
          rotVertexes[1].getVector((i/triangleNum + p.frameCount*p.TWO_PI/360/2)%1),
          rotVertexes[2].getVector((i/triangleNum + p.frameCount*p.TWO_PI/360/2)%1),
          i
        )
      }
      p.pop()

      for(let i=0; i<rotVertexes.length; i++) {
        rotVertexes[i].update(p.frameCount)
      }

      if (p.mouseIsPressed === true){
        if (inRange()){
            a = a + 0.04;
            s = p.cos(a) * 2;
            p.push();
            p.translate(redrw.x+30, redrw.y-30);
            //applyMatrix(1 / step, 0, 0, 1 / step, 0, 0);
            p.scale(7);
            p.fill(51);
            p.triangle(0, 20, -20, -20, 20, -20);
            //rect(30, 20, 50, 50);
            
          if (p.mouseIsPressed === false){
              
              p.pop();
              pressed = false;
              redrw = 0;
              count = 0;
          }
        } 
      }
    }

    function inRange(){
      for (let i = 0; i < 10; i++) {
        if (p.mouseX>=particles[i].x && p.mouseX<=particles[i].x+20 && p.mouseY>=particles[i].y-20 && p.mouseY<=particles[i].y){
          redrw = particles[i];
          return true;
        }
      }
    }      
    

    function drawTriangle(vec1, vec2, vec3, n) {
      let center = p5.Vector.add(vec1, vec2)
      center = p5.Vector.add(center, vec3)
      center.div(3)
      let miniVec1 = p5.Vector.add(vec1, center), miniVec2 = p5.Vector.add(vec2, center), miniVec3 = p5.Vector.add(vec3, center)
      miniVec1.div(2)
      miniVec2.div(2)
      miniVec3.div(2)
    
      let vecs = [vec1, vec2, vec3]
      let miniVecs = [miniVec1, miniVec2, miniVec3]

      for(let i=0; i<3; i++) {
        p.beginShape()
        p.vertex(miniVecs[i].x, miniVecs[i].y)
        p.vertex(vecs[i].x, vecs[i].y)
        p.vertex(vecs[(i+1)%3].x, vecs[(i+1)%3].y)
        p.stroke(255)
        p.strokeWeight(p.random(noiseProg/7));
        p.fill(255, 20)
        // p.stroke(colrgb[(n%5)][0],colrgb[(n%5)][1],colrgb[(n%5)][2])
        // p.fill(colrgb[(n%5)][0],colrgb[(n%5)][1],colrgb[(n%5)][2], transparency)
        p.endShape(p.CLOSE)
      }
      for(let i=0; i<3; i++) {
        p.beginShape()
        p.vertex(center.x, center.y)
        p.vertex(miniVecs[i].x, miniVecs[i].y)
        p.vertex(vecs[(i+1)%3].x, vecs[(i+1)%3].y)
        p.stroke(255)
        p.fill(0,0,0, 20)
        // p.stroke(colrgb[(n%5)][0],colrgb[(n%5)][1],colrgb[(n%5)][2])
        // p.fill(colrgb[(n%5)][0],colrgb[(n%5)][1],colrgb[(n%5)][2], transparency)
        p.endShape(p.CLOSE)
      }
    
      p.triangle(vec1.x, vec1.y, vec2.x, vec2.y, vec3.x, vec3.y)
      p.fill(colrgb[(n%5)][0],colrgb[(n%5)][1],colrgb[(n%5)][2], transparency)
    }

    class Star {
      constructor() {
        this.x = p.random(-p.width, p.width);
          this.y = p.random(-p.height, p.height);
          this.z = p.random(p.width);      
          this.pz = this.z;
  
      }
      
      update() {
        this.z = this.z - (transparency/18) - 5;
        if (this.z < 1) {
          this.z = p.width;
          this.x = p.random(-p.width, p.width);
          this.y = p.random(-p.height, p.height);
          this.pz = this.z;
        }
      }
      star(x, y, radius1, radius2, npoints) {
        var angle = p.TWO_PI / npoints;
        var halfAngle = angle / 2.0;
        p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += angle) {
          let sx = x + p.cos(a) * radius2;
          let sy = y + p.sin(a) * radius2;
          p.vertex(sx, sy);
          sx = x + p.cos(a + halfAngle) * radius1;
          sy = y + p.sin(a + halfAngle) * radius1;
          p.vertex(sx, sy);
        }

        p.endShape(p.CLOSE);
      }
      
      show() {
        p.fill(255);
        p.noStroke();
        
        var sx = p.map(this.x/this.z, 0, 1, 0, p.width);
        var sy = p.map(this.y/this.z, 0, 1, 0, p.height);
        var r = p.map(this.z, 0, p.width, 8, 0);
        this.star(sx, sy, r, r/2,10); 
        var px = p.map(this.x/this.pz, 0, 1, 0, p.width);
        var py = p.map(this.y/this.pz, 0, 1, 0, p.height);
        this.pz = this.z;
        
        //p.stroke(255);
        //p.line(px, py, sx, sy);
      }
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
    class Clickable {
      constructor(){
      this.x = p.random(p.windowWidth);
      this.y = p.random(p.windowHeight-200);
      }
      
      drawNow(){
        p.noStroke();
        p.fill(255,p.random(100));
        p.push();
        p.translate(this.x,this.y);
        p.rotate(p.frameCount*0.1);
        p.triangle(0, 20, -20, -20, 20, -20);
        p.pop();
        
        // frameRate(1);
        
      }
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