var man, man_running;
var bg;
var obstacleImg;
var invisibleGround;
var obstaclesGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;


function preload(){
  bg = loadImage("background2.png");
  man_running = loadAnimation("man1.png","man2.png","man3.png");
  obstacleImg = loadImage("obstacle.png");
}


function setup() {
  createCanvas(800,400);
  man = createSprite(400,280,50,50);
  man.scale = 1.5;
  man.addAnimation("manRunning", man_running);

  invisibleGround = createSprite(400,350,800,10);
  invisibleGround.visible = false;

  obstaclesGroup = createGroup();

  man.setCollider("circle",0,0,40);

  score = 0
  

}

function draw() {
  background(bg);  
  fill("black");
  text("Distance: "+ score, 60,50);

  if(gameState === PLAY){

    score = score +
    Math.round(frameCount/60);

    



    if(keyDown("space")&& man.y >= 200){
      man.velocityY = -15
    }
  
    man.velocityY = man.velocityY + 0.8;
  
    if(World.frameCount % 100 == 0){
      obstacles();
    }  

    if(obstaclesGroup.isTouching(man)){
      gameState = END;
    }

  }else if(gameState === END){
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.destroyEach();
    man.destroy();
    

    textSize(32);
    fill("white");
    text("GameOver - Try Again!!",220,200);
    
    
  }






  man.collide(invisibleGround);
  

  drawSprites();
}

function obstacles(){
  var obstacle = createSprite(800,310,10,10);
  obstacle.addImage(obstacleImg);
  obstacle.velocityX = -8;
  obstacle.lifetime = 350;
  obstacle.scale = 0.5;
  obstacle.debug = true;
  obstacle.setCollider("circle",0,0,50)

  obstaclesGroup.add(obstacle);
} 