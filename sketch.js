var banana,bananaImage;
var obstacle,obstacleGroup;
var monkey,monkeyImage,monkeyImage2;
var backgrounds,backgroundImage;
var score;
var invisibleGround;
var foodsGroup;
var stop;
var PLAY;
var END;
var gameState;
var gameOverImage,gameOver;

function preload()
{
   monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backgroundImage = loadImage("jungle.jpg");
  
  bananaImage = loadImage("Banana.png");
  
  groundImage = loadImage("ground.jpg");
  
  obstaclesImage = loadImage("stone.png");
  
  gameOverImage = loadImage("gameOver.png");
  
  monkeyImage2 = loadImage("Monkey_01.png");
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
  
  var  PLAY = 1;
  var  END  = 0; 
  var gameState = PLAY ;
  
  
  score = 0;
  
  backgrounds = createSprite(200,350);
  backgrounds.addImage("background",backgroundImage); 
  
  monkey = createSprite(55,385,20,20);
  monkey.addAnimation("monkeyImage",monkeyImage);
  monkey.scale = 0.15;
  
  foodsGroup = createGroup();
  
  obstaclesGroup = createGroup();
  
  invisibleGround = createSprite(200,545,400,60);
  
  stop = 20;
   gameOver = createSprite(300,300); 
    gameOver.addImage("Over",gameOverImage);
    gameOver.scale = 1.5;

}

function draw() 
{
  background(220);
  drawSprites();
  
  if(gameState == PLAY)
  {
    
    if(stop > 10)
    {
    spawnBananas();
    spawnObstacles();
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    invisibleGround.visible = false;
   
    monkey.collide(invisibleGround);
  
    if(keyDown("space")&&monkey.y >= 440)
    {
     monkey.velocityY = -15; 
    } 
  
     backgrounds.velocityX = -10;
  
    if(backgrounds.x < 110)
    {
      backgrounds.x = backgrounds.width/2;
    }
    
    if(monkey.isTouching(foodsGroup))
    {
      foodsGroup.destroyEach();
      score = score + 20;
      monkey.scale = monkey.scale +0.025;
    }
    if(monkey.isTouching(obstaclesGroup))
    {
      obstaclesGroup.destroyEach();
      score = 0;
      monkey.scale = 0.15;
      stop = stop - 10;
      
    }
    
    gameOver.visible = false;
    if(stop == 10)
    {
      gameOver.visible = true;
     backgrounds.velocityX = 0;
      foodsGroup.setVelocityXEach(0);
      obstaclesGroup.setVelocityXEach(0);
      foodsGroup.setLifetimeEach(-1);
      obstaclesGroup.setLifetimeEach(-1);
    }
    
   
  
    
  textSize(50);
  fill("blue");
  text("Score = " + score,190,100);
 }
  
  else if(gameState == END)
  {
     foodsGroup.setVelocityXEach(0);
     monkey.velocityY = -1;
    
  }
}  
function spawnBananas()
{
  if(frameCount % 150 == 0)
  {
     banana = createSprite(600,170,10,10);
     banana.addImage("Banana",bananaImage);
     banana.scale = 0.07;
    
     banana.velocityX = -5;
    
     banana.y = random(170,400);
    
     banana.lifetme = 120;
    
     banana.depth = monkey.depth;
     monkey.depth = monkey.depth + 1;
    
     foodsGroup.add(banana);
  }
}

function spawnObstacles()
{
  
  if(frameCount% 90 == 0)
  {
    obstacle = createSprite(600,490);
    obstacle.addImage("obs",obstaclesImage);
    obstacle.scale = 0.20; 
  
    obstacle.velocityX = -7;
  
    obstacle.lifetime = 86;
  
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  
   obstaclesGroup.add(obstacle);
  }
}
