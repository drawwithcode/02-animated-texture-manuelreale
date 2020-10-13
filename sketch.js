let myPersonalBubbles =[];
let myPersonalBgBubbles =[];
let myPersonalCagedBubbles =[];


function preload(){
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  addCagedBubble();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);

  myPersonalCagedBubbles.splice(0,myPersonalCagedBubbles.length)
  addCagedBubble();
  console.log(' resized')
redraw()

}

function draw() {


  // put drawing code here
  background('black');




  //if(mouseIsPressed && myPersonalBubbles.length<100){
  //addBubble();}
  for(let p = 0; p < myPersonalCagedBubbles.length; p++){
    //myPersonalCagedBubbles[p].checkDistance();
    myPersonalCagedBubbles[p].runCaged();

  }

for(let i = 0; i < myPersonalBubbles.length; i++){
  myPersonalBubbles[i].run();
}
for(let o = 0; o < myPersonalBgBubbles.length; o++){
  myPersonalBgBubbles[o].runBg();
}
push()
fill('white')
textAlign(CENTER);
textSize(52);
textFont('Georgia');
text('Click on a bubble to set it free',windowWidth/2, windowHeight/2);
pop()
}


function mousePressed() {
  for(let p = 0; p < myPersonalCagedBubbles.length; p++){

    myPersonalCagedBubbles[p].onPress();
  }}

  function addCagedBubble(){
    this.xC=0;
    this.yC=0;
    this.rC=50;

    for(i=0;i*2*rC<windowHeight;i++){
      for(t=0;t*2*rC<windowWidth;t++){
        this.xC=t*this.rC*2;
        this.yC=i*this.rC*2;
        const aNewCagedBubble = new CagedBubble(xC, yC, rC)
        myPersonalCagedBubbles.push(aNewCagedBubble);
      }
    }
  }


function addBubble(x,y){
  this.x=x;
  this.y=y;
  const aNewBubble = new Bubble(this.x, this.y, random(10,10))
  myPersonalBubbles.push(aNewBubble);
}



function addBgBubble(x,y,r){
  this.x=x;
  this.y=y;
  this.r=r;

  const aNewBgBubble = new BgBubble(this.x, this.y, this.r)
  myPersonalBgBubbles.push(aNewBgBubble);
}





class CagedBubble {
  constructor(temp_x,temp_y,temp_r) {
    this.xC=temp_x;
    this.yC=temp_y;
    this.rC=temp_r;
    this.xC2=this.xC;
    this.yC2=this.yC;
    this.rC2=this.rC;
    this.roC=0;
    this.timer=5000;


  }

  displayCaged(){
    push()
    stroke(255)
    noStroke()
    fill((color(255,0,0+this.roC*10,255/(this.dist/50))))
    ellipse(this.xC2,this.yC2,this.rC2)
    pop()
  }

    updateCaged(){

      if(this.roC>0){this.roC--}
      if(this.roC<0){this.roC++}


      this.dist=dist(mouseX,mouseY,this.xC,this.yC);
      if(this.dist<50){this.dist=50}
      if(this.dist>400){this.dist=400}



      this.rC2=(this.roC)+this.rC+(random(-600,600)/(this.dist));
      this.xC2=this.xC+(random(-200,200)/(this.dist));
      this.yC2=this.yC+(random(-200,200)/(this.dist));

      if(this.timer<5000){
        //console.log(this.timer)
        this.timer+=20;
        if(this.wave<100+this.timer){if(this.roC<30){this.roC+=10;}}
        if(this.wave<50+this.timer){this.roC-=11;}
        if(this.wave>30000+this.timer){this.roC-=10;}
        if(this.wave>60000+this.timer){this.roC=0;}


      }

  }

  onPress(){

this.wave=dist(mouseX,mouseY,this.xC,this.yC);
    this.timer=0;
if(dist(mouseX,mouseY,this.xC,this.yC)<this.rC){
  addBgBubble(this.xC,this.yC,this.rC);
  this.xC=windowWidth+100;
  this.yC=windowHeight+100

}

  }

  runCaged(){
    this.displayCaged();
    this.updateCaged();
  }

}







class Bubble {
  constructor(temp_x,temp_y,temp_r) {
    this.x=temp_x;
    this.y=temp_y;
    this.r=temp_r;
    this.segnox=random(-10,10);
    this.segnoy=random(-10,10);
    this.age = 0;


  }

  display(){
    push()
    //noFill()
    noStroke()
    fill(0,0,255,100)
    ellipse(this.x,this.y,this.r*2)
    pop()
  }

  updatePosition(){
    //console.log(myPersonalBubbles[0].x)
    this.age++
    this.r-= 1/20
    if(this.y<=windowHeight-this.r){
    this.segnoy+=1}

    //console.log(myPersonalBubbles.length)

    // if (this.age>200 && mouseIsPressed){
    //   //myPersonalBubbles.pop(this.bubble)
    //
    //   this.age = 0;
    //   this.x=mouseX
    //   this.y=mouseY
    //   this.r = 10;
    //   this.segnox=random(-10,10);
    //   this.segnoy=random(-10,10);
    // }

if(this.x>=windowWidth-this.r){this.segnox = -1*(this.segnox);}
if(this.y>=windowHeight-this.r){this.segnoy = -1*(this.segnoy-random(15,25));}

if(this.x<=0){this.segnox = -1*this.segnox;}
if(this.y<=0){this.segnoy = -1*this.segnoy;}

this.x += this.segnox
this.y += this.segnoy

  }

  run(){
    this.updatePosition();
    this.display();
  }

}

class BgBubble {
  constructor(temp_x,temp_y,temp_r) {
    this.x=temp_x;
    this.y=temp_y;
    this.r=temp_r;
    this.segnox=random(-7,7);
    this.segnoy=random(-7,7);
    this.age = 0;


  }

  displayBg(){
    push()

    stroke(255)
    noStroke()

    fill(lerpColor(color(255,0,255,100),color(0,0,255,100), this.age/250))

    ellipse(this.x,this.y,this.r)
    pop()
  }

  updateBgPosition(){

    this.age++
    this.r+= 1/10
    if(this.age>random(200,400)){
      addBubble(this.x,this.y);
      addBubble(this.x,this.y);
      addBubble(this.x,this.y);
      addBubble(this.x,this.y);
      addBubble(this.x,this.y);
      addBubble(this.x,this.y);
      if(myPersonalBubbles.length>60){
      myPersonalBubbles.splice(0,6)}

      myPersonalBgBubbles.splice(0,1)

      // this.r=50;
      // this.x=random(0,windowWidth)
      // this.y=random(0,windowHeight)
      // this.segnox=random(-5,5);
      // this.segnoy=random(-5,5);
      // this.age = 0;
    }





if(this.x>=windowWidth-this.r/2){this.segnox = -1*(this.segnox);this.x=windowWidth-this.r/2}
if(this.y>=windowHeight-this.r/2){this.segnoy = -1*(this.segnoy);this.y=windowHeight-this.r/2}

if(this.x-this.r/2<=0){this.segnox = -1*this.segnox;this.x=0+this.r/2}
if(this.y-this.r/2<=0){this.segnoy = -1*this.segnoy;this.y=0+this.r/2}

this.x += this.segnox
this.y += this.segnoy

  }

  runBg(){
    this.updateBgPosition();
    this.displayBg();
  }

}



//resizeCanvas(windowWidth,windowHeight)
