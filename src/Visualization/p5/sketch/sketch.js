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


  colorMode(HSB, 1);   
  angleMode(DEGREES);
  noFill();
  kMax = random(0.6, 1.0);
  step = 0.01;
  noStroke();
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
  


    translate(width/2, height/2);
  
    for (var i = 0; i < stars.length; i++) {
      stars[i].update();
        stars[i].show();
    }


      let t = frameCount/100;
  for (let i = n/2; i > 0; i--) {
    let alpha = 1 - noiseProg(i / n);
    fill((alpha/5 + 0.5)%1, 1, 1, alpha);
    let size = radius + i * inter;
    let k = kMax * sqrt(i/n);
    let noisiness = maxNoise/2 * noiseProg(i / n);
   


    blob(size, 0, 0, k, t - i * step, noisiness);
    

  }

}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
  let angleStep = 360 / 10;
  for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
    let r1, r2;
    r1 = cos(theta)+1;
    r2 = sin(theta)+1;
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();
}



class Particle {
  constructor() {
    this.x = random(0, screen.width);
    this.y = 400;
    this.vx = random(-1, 1);
    this.vy = random(-5, -1);
    this.alpha = 255;
    this.d = 16;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 3;
    this.d -= random(0.05, 0.1);
  }

  show() {
    noStroke();
    fill(random(200,230), random(50, 150), 10, this.alpha);
    ellipse(this.x, this.y, this.d);
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

