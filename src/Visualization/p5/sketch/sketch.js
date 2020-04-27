particles = [];
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



function setup() {
  createCanvas(1112, 834);
  star = new Star();
  
    // Create an array of 1600 star objects
    for (var i = 0; i < 1600; i++) {
        stars[i] = new Star();
      
        // This also works to populate the array
        // star = new Star();
    // append(stars, star);
    }
 

  //new stuff for triangles below
  colorMode(HSB, 360, 100, 100, 100)
  // noLoop()
  strokeWeight(2)
  strokeJoin(ROUND)

  rotVertexes = [new RotationVertex(1), new RotationVertex(1), new RotationVertex(-1)]

}

function draw() {
    bgcx = 255-bgc;
    background(bgc);
  
  // for (let i = 0; i < 2; i++) {
  //   let p = new Particle();
  //   particles.push(p);
  // }
  // for (let i = particles.length - 1; i >= 0; i--) {
  //   particles[i].update();
  //   particles[i].show();
  //   if (particles[i].finished()) {
  //     particles.splice(i, 1);
  //   }
  // }
  // fill(40, 25, 2);
  
    //take out translate to make straight

   // translate(width/2, height/2);
  
    for (var i = 0; i < stars.length; i++) {
      stars[i].update();
        stars[i].show();
    }




  

  //new stuff for triangles
  if(true) {
    push()
    //background(2, 80)
    translate(width/2, height/2)
    for(let i = 0; i < triangleNum; i++) {
      let col = color[i%5]
      drawTriangle(
        rotVertexes[0].getVector((i/triangleNum + frameCount*TWO_PI/360/2)%1),
        rotVertexes[1].getVector((i/triangleNum + frameCount*TWO_PI/360/2)%1),
        rotVertexes[2].getVector((i/triangleNum + frameCount*TWO_PI/360/2)%1),
        col
      )
    }
    pop()

    for(let i=0; i<rotVertexes.length; i++) {
      rotVertexes[i].update(frameCount)
    }
  }
}



class Star {
    constructor() {
      this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);      
        this.pz = this.z;

    }
    update() {
      this.z = this.z - speed;
      if (this.z < 1) {
        this.z = width;
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.pz = this.z;
      }
    }
  
    show() {
      fill(bgcx);
      noStroke();
      
      var sx = map(this.x/this.z, 0, 1, 0, width);
      var sy = map(this.y/this.z, 0, 1, 0, height);
      var r = map(this.z, 0, width, 8, 0);
      ellipse(sx, sy, r, r);    
      
      var px = map(this.x/this.pz, 0, 1, 0, width);
      var py = map(this.y/this.pz, 0, 1, 0, height);
      this.pz = this.z;
      
      stroke(255);
      line(px, py, sx, sy);
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
  noFill()
  stroke(col)
  for(let i=0; i<3; i++) {
    beginShape()
    vertex(miniVecs[i].x, miniVecs[i].y)
    vertex(vecs[i].x, vecs[i].y)
    vertex(vecs[(i+1)%3].x, vecs[(i+1)%3].y)
    endShape(CLOSE)
  }
  for(let i=0; i<3; i++) {
    beginShape()
    vertex(center.x, center.y)
    vertex(miniVecs[i].x, miniVecs[i].y)
    vertex(vecs[(i+1)%3].x, vecs[(i+1)%3].y)
    endShape(CLOSE)
  }

  triangle(vec1.x, vec1.y, vec2.x, vec2.y, vec3.x, vec3.y)
  
}

class RotationVertex {
  constructor(wise) {
    this.seed = random(1000)
    noiseSeed(this.seed)
    this.center = createVector(0, 0)
    this.radius = noise(0) * 400
    this.initAngle = noise(1000) * TWO_PI * noiseAngleTimes
    this.clockWise = wise
  }

  update(tick) {
    noiseSeed(this.seed)
    this.radius = noise(tick*noiseScale) * 400
    this.initAngle = noise(1000 + tick*noiseScale) * TWO_PI * noiseAngleTimes
  }

  getVector(rotRatio) {
    let x = this.center.x + this.radius*cos(this.initAngle + this.clockWise * rotRatio*TWO_PI)
    let y = this.center.y + this.radius*sin(this.initAngle + this.clockWise * rotRatio*TWO_PI)
    return createVector(x, y)
  }
}