var scaleFactor = 1;
var yRotationFactor = 0;
var xRotationFactor = 0;
var prevMouseX = 0, prevMouseY = 0;

function setup() {
  createCanvas(500, 500, WEBGL);
}

function draw() {
  
  //clickAndDrag();
  scale(scaleFactor);
  
  angleMode(RADIANS);
  
  background(255, 255, 255);
  noStroke();
  ambientLight(10, 10, 10, 0.1);
  pointLight(250, 250, 250, 200, 200, 400);
  pointLight(250, 250, 250, -200, -200, -200);
  
  var spheres = [];
  spheres[0] = new logicSphere(0, 0, 0);
  spheres[1] = new logicSphere(100, 100, 100);
  spheres[2] = new logicSphere(-100, 100, 100);
  spheres[3] = new logicSphere(-100, -100, 100);
  spheres[4] = new logicSphere(100, 100, -100);
  spheres[5] = new logicSphere(100, -100, -100);
  spheres[6] = new logicSphere(100, -100, 100);
  spheres[7] = new logicSphere(-100, 100, -100);
  spheres[8] = new logicSphere(-100, -100, -100);
  
  for (var i = 0; i < spheres.length; i++) {
    spheres[i].drawSphere();
  }
  
  for( var i = 1; i < spheres.length; i++)
  connectSpheres(spheres[0], spheres[i]);
  
    

  orbitControl(3,3,0);
  
}

class logicSphere {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  drawSphere() {
    translate(this.x, this.y, this.z);
    sphere(30);
    translate(-this.x, -this.y, -this.z);
  }
}

function connectSpheres(s1, s2) {
  
  let xdiff = s2.x-s1.x;
  let ydiff = s2.y-s1.y;
  let zdiff = s2.z-s1.z;
  
  let xsum = s2.x+s1.x;
  let ysum = s2.y+s1.y;
  let zsum = s2.z+s1.z;
  
  let distance = Math.sqrt( Math.pow(xdiff, 2) + Math.pow(ydiff,2) + Math.pow(zdiff, 2));
  
  let vI = createVector(0,1,0);
  let vF = createVector(xdiff,ydiff,zdiff);
  let theta = p5.Vector.angleBetween(vI,vF);
  let k = p5.Vector.cross(vI,vF);
  vI.normalize();
  vF.normalize();
  k.normalize();
  
  let q0 = cos(theta/2);
  let q1 = k.x * sin(theta/2);
  let q2 = k.y * sin(theta/2);
  let q3 = k.z * sin(theta/2);
  
  let q02 = Math.pow(cos(theta/2),2);
  let q12 = Math.pow(k.x * sin(theta/2),2);
  let q22 = Math.pow(k.y * sin(theta/2),2);
  let q32 = Math.pow(k.z * sin(theta/2),2);       
  
  translate( xsum/2, ysum/2, zsum/2 );
  
  if (s2.x <= s1.x)
    rotateY(Math.PI);
  
  applyMatrix(
    q02+q12-q22-q32, 2*q1*q2-2*q0*q3,  2*q1*q3+2*q0*q2,  0.0,
    2*q1*q2+2*q0*q3, q02-q12+q22-q32, 2*q2*q3-2*q0*q1,  0.0,
    2*q1*q3-2*q0*q2, 2*q2*q3+2*q0*q1, q02-q12-q22+q32,  0.0,
    0.0, 0.0, 0.0,  1.0
  );
  
  
  
  cylinder( 10, distance );
  
  translate( -xsum/2, -ysum/2, -zsum/2 );
  resetMatrix();
  scale(scaleFactor);
}

function clickAndDrag() {
    if (mouseIsPressed) {
    yRotationFactor += mouseX - prevMouseX;
    xRotationFactor -= mouseY - prevMouseY;
  }
  
  rotateY((yRotationFactor)/(24*Math.PI));
  rotateX((xRotationFactor)/(24*Math.PI));
  
  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

function mouseWheel(event) {
 scaleFactor -= event.delta/1000;
}


