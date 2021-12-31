 var JOGAR = 1;
 var ENCERRAR = 0;
 var estadoJogo = JOGAR;
 
 var fim
 var restart
 var trex, trex_correndo, trex_colidiu;
 var solo, soloinvisivel, imagemdosolo;

 var nuvem, grupodenuvens, imagemdanuvem;
 var grupodeobstaculos, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

 var pontuacao;

 var somCheckPoint;
 var somJump;
 var somDie;


//-------------------------------------------------------------------------------------------------
 
function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  imagemdanuvem = loadImage("cloud.png");
  imagemdofim = loadImage("gameOver.png");
  imagemdofim2 = loadImage("restart.png");

  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
  somCheckPoint = loadSound("checkPoint.mp3");
  somDie = loadSound("die.mp3");
  somJump = loadSound("jump.mp3");



}

//-----------------------------------------------------------------------------------------------

 function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided" , trex_colidiu)
  trex.scale = 0.5;
  
  solo = createSprite(200,189,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  //solo.velocityX = -(6 + pontuacao / 500); 
  
  soloinvisivel = createSprite(200,200,400,10);
  soloinvisivel.visible = false;
   
  //criar grupos de obstáculos e de nuvens
  grupodeobstaculos = createGroup();
  grupodenuvens = createGroup();
  
  console.log("Oi" + 5);
   
  //-------------------------------------------------------------------
   trex.setCollider("rectangle",0,0,80, trex.width +150, trex.height);
   //trex.setCollider("circle",0,0,40);
  
  
  trex.debug = true
  pontuacao = 0;
}
//----------------------------------------------------------------------
function draw() {
   background("white");
   
  //exibindo pontuação
  text("Pontuação: "+ pontuacao, 500,60);
    
  console.log("isto é ",estadoJogo)
  
  
  if(estadoJogo === JOGAR){
    //mover o solo
    solo.velocityX = -(6 + pontuacao / 500);
    //marcando pontuação
    pontuacao = pontuacao + Math.round(frameCount/60);
    
    
    if (solo.x < 0){
      solo.x = solo.width/2;
    }
    
    //saltar quando a tecla de espaço é pressionada
    if(keyDown("space")&& trex.y >= 100) {
       trex.velocityY = -13;
       //somJump.play();

  }
  
    //adicionar gravidade
    trex.velocityY = trex.velocityY + 0.8
   
    //gerar as nuvens
    gerarNuvens();
  
    //gerar obstáculos no solo
    gerarObstaculos();
       
    

    
    
    
    if(grupodeobstaculos.isTouching(trex)){
      //estadoJogo = ENCERRAR;
      //somDie.play();
      
      
      //Hack do Trex
      trex.velocityY = -13;
   
   
    }
  }
     else if (estadoJogo === ENCERRAR) {
      solo.velocityX = 0;
     grupodeobstaculos.setVelocityXEach(0);
     grupodenuvens.setVelocityXEach(0);
     
     
     fim = createSprite(300,100, 100, 10);
     fim.addImage(imagemdofim);
     fim.scale = 0.7;
    
     restart = createSprite(300,130, 100, 10);
     restart.addImage(imagemdofim2);
     restart.scale = 0.4;
    
    
    
    }
  
  
  //evita que o Trex caia no solo
  trex.collide(soloinvisivel);

  
  
  drawSprites();
}

function gerarObstaculos(){
 if (frameCount % 60 === 0){
   var obstaculo = createSprite(599,174,10,40);
  obstaculo.velocityX = -(6 + pontuacao / 500);
      
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstaculo.addImage(obstaculo1);
              break;
      case 2: obstaculo.addImage(obstaculo2);
              break;
      case 3: obstaculo.addImage(obstaculo3);
              break;
      case 4: obstaculo.addImage(obstaculo4);
              break;
      case 5: obstaculo.addImage(obstaculo5);
              break;
      case 6: obstaculo.addImage(obstaculo6);
              break;
      default: break;
    }
   
    //atribuir escala e tempo de duração ao obstáculo         
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 300;
   
    //adicionar cada obstáculo ao grupo
    grupodeobstaculos.add(obstaculo);
 }
}

function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,105,40,10);
    nuvem.y = Math.round(random(10,60));
    nuvem.addImage(imagemdanuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
    
     //atribuir tempo de duração à variável
    nuvem.lifetime = 218;
    
    //ajustando a profundidade
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
        
    //adiciondo nuvem ao grupo
   grupodenuvens.add(nuvem);
  }
}

