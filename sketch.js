var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(599, 600);
  //spookySound.loop();
  tower = createSprite(299, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw() {
  background(255);

  if (gameState === "play") {
    if (keyDown("left")) {
      // escreva o código para mover para a esquerda quando a seta para a esquerda for pressionada
      ghost.x = ghost.x - 5;
      //mudar o lado do ghost
      ghost.mirrorX(1);
    }
    if (keyDown("right")) {
      // escreva o código para mover para a esquerda quando a seta para a direita for pressionada
      ghost.x = ghost.x + 5;

      //mudar o lado do ghost
      ghost.mirrorX(-1);
    }
    if (keyDown("up")) {
      // escreva o código para mover para cima quando a tecla espaço for pressionada
      ghost.velocityY = -5;
    }

    //gravidade
    ghost.velocityY = ghost.velocityY + 0.8;

    //escreva uma condição para a torre de rolagem infinita
    if (tower.y > height) {
      tower.y = 0;
    }

    spawnDoors();

    //escrever um código para fazer o climbersGroup (grupo de escaladores) colidir com o fantasma alterar a velocidade do fantasma

    ghost.collide(climbersGroup);

    //escreva um código para fazer o invisibleBlockGroup (grupo de bloco invisível) colidir com o fantasma, destruir o fantasma e mudar o estado de jogo para end.

    if (ghost.isTouching(climbersGroup)) {
      gameState = "end";
      ghost.destroy();
    }

    drawSprites();
  }
  if (gameState === "end") {
    background("black");
    stroke("yellow");
    fill("red");
    textSize(70);
    textAlign(CENTER);
    text("Game Over", 300, 300);
  }
}

function spawnDoors() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 200 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 25);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.visible = false;
    //adicione a função aleatória
    door.x = random(100, 400);
    climber.x = door.x;
    invisibleBlock = climber.x;

    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    climbersGroup.add(climber);

    //mude a profundidade do fantasma e da porta
    door.depth = ghost.depth;
    ghost.depth += 1;

    //atribuir tempo de vida ao obstacle.lifetime = 300; aqui os obstáculos são as portas, o escalador e o bloco invisível
    door.lifetime = 500;
    climber.lifetime = 500;
    invisibleBlock = 500;

    //adicione cada obstáculo ao grupo obstaclesGroup.add(obstacle); aqui os obstáculos são as portas, o escalador e o bloco invisível
  }
}
