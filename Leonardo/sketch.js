
var leonardo, jake;
var estrada, rua, bomba, moeda, energy;
var energetico, bebida, explode, bomba, explode, moeda, dinheiro;

var grupodepoderes;



//-------------------------------------------------------
function preload(){
  //imagens pré-carregadas

  jake = loadAnimation("jake5.PNG", "jake4.png","jake3.png","jake2.png","jake1.png");
  rua = loadImage("path.png");
  bebida = loadImage("energyDrink.png");
  explode = loadImage("bomb.png");
  dinheiro = loadImage("coin.png");




}

function setup(){
  createCanvas(400,400);
  //crie os sprites aqui
 
  estrada = createSprite(200,180, 400,400);
  estrada.addImage(rua);
  estrada.scale = 1.35
  estrada.velocityY = 5
  
  
  leonardo = createSprite(200,330, 50,50);
  leonardo.addAnimation("running", jake);
  leonardo.scale = 0.85

 

 

}

function draw() {
  background(0);


  //----------------------------------
  if(estrada.y > 640){
 estrada.y = height/2;

 }
 
 
if(keyDown("LEFT")){

  leonardo.x = leonardo.x -10; 
}
 
if(keyDown("RIGHT")){

  leonardo.x = leonardo.x +10; 
}
//----------------------------------- 
 
 




  drawSprites();

}




