var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3

  climbersGroup=createGroup()
}

function draw() {
  background(200);
  if(gameState==="play"){
    if(keyDown("left_arrow")){
      ghost.x-=3
    }
    if(keyDown("right_arrow")){
      ghost.x+=3
    }
    if(keyDown("space")){
      ghost.velocityY=-10
    }
    ghost.velocityY+=0.5
    if(tower.y > 400){
        tower.y = 300
      }
    spawnwindows()
    if(ghost.isTouching(climbersGroup)||ghost.y>600){
      gameState="end"
    }
    drawSprites()
  }
  if(gameState==="end"){
    background(0)
    fill("white")
    text("GameOver",250,300)
    
  }
}
function spawnwindows(){
  if(frameCount%175===0){
    var door = createSprite(Math.round(random(100,500,0)))
    door.velocityY=3
    door.addImage(doorImg)
    var climber = createSprite(door.x,door.y+60)
    climber.velocityY=3
    climber.addImage(climberImg)
    climber.scale = 0.5
    climbersGroup.add(climber)
    door.lifetime = 200
    climber.lifetime = 200
    climber.debug = true
  }
}
