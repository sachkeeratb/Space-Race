var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, playerIMG, backgroundIMG;
var asteroidIMG, asteroidGroup;

var score = 0;

var gameOver, restart, gameOverIMG, restartIMG;

function preload() {
  backgroundIMG = loadImage("space.png")
  playerIMG = loadImage("Spaceship.png")
  
  gameOverIMG = loadImage("gameOver.png");
  restartIMG = loadImage("restart.png");

  asteroidIMG = loadImage("asteroid.png");
}

function setup() {
  createCanvas(400, 700);

  space = createSprite(200,350,400,700);
  space.addImage("space",backgroundIMG);

  player = createSprite(50,height-70,20,50);
  
  player.addAnimation("player", playerIMG);

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverIMG);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartIMG);
  
  gameOver.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  asteroidGroup = new Group();
}

function draw() {
  background(0);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    space.velocityY = 10;
    
    if(keyDown("A")){
      player.x = player.x - 10;
    }

    if(keyDown("D")){
      player.x = player.x + 10;
    }
  
    if (space.y > 600){
      space.y = 350;
    }

    spawnAsteroids();
  
    if(asteroidGroup.isTouching(player)){
      gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    space.velocityY = 0;
    player.velocityX = 0;
    asteroidGroup.setVelocityXEach(0);
    
    asteroidGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
      reset();
    }
  }

  drawSprites();
  textSize(20);
  fill("white")
  text("Score: "+ score,30,50);
}

function spawnAsteroids() {
  if(frameCount % 60 === 0) {
    var asteroid = createSprite(600,-10,20,30);
    asteroid.x=Math.round(random(0,500));
    asteroid.setCollider('circle',0,0,45);
    asteroid.addImage(asteroidIMG);

    asteroid.scale = 0.3;
    asteroid.velocityY = 20;
    
    asteroid.lifetime = 16000;
    asteroid.depth = player.depth;
    player.depth +=1;

    asteroidGroup.add(asteroid);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  asteroidGroup.destroyEach();
  
  score = 0;
}
