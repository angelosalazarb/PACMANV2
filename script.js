//Librería functional-light
let { append, cons, first, isEmpty, isList, length, rest } = functionalLight;

//Variables globales y  cargar archivos.
const waka = new Audio("sound/waka_waka.mp3");
const music = new Audio("sound/music.mp3");
const ghostD = new Audio("ghost_dead.mp3");
const pacD = new Audio("sound/pacman_death.wav");
const fruit = new Audio("sound/pacman_eatfruit.wav");;
const tada = new Audio("sound/Ta_Da.mp3");


var gblue = null;
var goran = null;
var gpink = null;
var gred = null;

var PACMANL= null;
var PACMANR = null;
var PACMANU = null;
var PACMAND = null;
var PACMANC = null;

/**
 * Contrato: <make><estructura>---><estructura>
 * proposito: Retorna una copia del mundo que puede ser modificada
 */
function make(data, attribute) {
  return Object.assign({}, data, attribute);
}
const WIDTH = 420;
const HEIGHT = 550;
const BSIZE = 22;
const MAPA = [
  /**
   * En el mapa, la siguiente representación para crearlo
   * 0 == Empty, 1 == Pacman, 2 == Rock, 3 == cookie, 
   * 4 == Big Cookie, 5 == BlueGhost, 6 == RedGhost, 
   * 7 == OrangeGhost, 8 == PinkGhost
   * 
   */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0],
  [0,2,3,3,3,3,3,3,3,2,3,3,3,3,3,3,3,2,0,0,0,0,0,0],
  [0,2,3,2,2,3,2,2,3,2,3,2,2,3,2,2,3,2,0,0,0,0,0,0],
  [0,2,4,2,2,3,2,2,3,2,3,2,2,3,2,2,4,2,0,0,0,0,0,0],
  [0,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,0,0,0,0,0,0],
  [0,2,3,3,3,3,2,3,3,2,3,3,2,3,3,3,3,2,0,0,0,0,0,0],
  [0,2,2,2,2,3,2,2,0,0,0,2,2,3,2,2,2,2,0,0,0,0,0,0],
  [0,0,0,0,2,3,2,0,0,2,0,0,2,3,2,0,0,0,0,0,0,0,0,0],
  [0,2,2,2,2,3,2,0,2,8,2,0,2,3,2,2,2,2,0,0,0,0,0,0],
  [11,3,3,3,3,3,3,0,2,7,2,0,3,3,3,3,3,3,12,0,0,0,0,0],
  [0,2,2,2,2,3,2,0,2,2,2,0,2,3,2,2,2,2,0,0,0,0,0,0],
  [0,0,0,0,2,3,2,0,0,0,0,0,2,3,2,0,0,0,0,0,0,0,0,0],
  [0,2,2,2,2,3,2,3,2,2,2,3,2,3,2,2,2,2,0,0,0,0,0,0],
  [0,2,3,3,3,3,3,3,3,2,3,3,3,3,3,3,3,2,0,0,0,0,0,0],
  [0,2,3,2,2,3,2,2,3,2,3,2,2,3,2,2,3,2,0,0,0,0,0,0],
  [0,2,4,3,2,3,6,3,3,1,3,3,3,3,2,3,4,2,0,0,0,0,0,0],
  [0,2,2,3,2,3,2,3,2,2,2,3,2,3,2,3,2,2,0,0,0,0,0,0],
  [0,2,3,3,3,3,2,3,3,2,3,3,2,3,3,3,3,2,0,0,0,0,0,0],
  [0,2,3,2,2,2,2,2,3,2,3,2,2,2,2,2,3,2,0,0,0,0,0,0],
  [0,2,3,3,3,3,3,3,3,3,3,5,3,3,3,3,3,2,0,0,0,0,0,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0],
  [0,"life","life","life",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

/**
 * Contrato:<forEach> <list>(<><num><num> --> ?)<index> -- > <?>
 * proposito: Lee un mapa (lista de la lista) y lo dibuja en el canvas
 */
function forEach(list, fun, index=0){
  if( !isEmpty(list) ){
    fun(first(list), index)
    forEach( rest(list), fun, index+1 )
  }
}


var crono;
var seconds = 0;
var minutes = 0; 
const seg = 0
const min = 0


function crono2(){

  
  crono = setInterval(
  function(){
    if (seconds == 60){
      seconds = 0;
      minutes = minutes + 1;
    }
    if(minutes == 0 ){
      minutes = 0;
    }
    seconds = seconds + 1;
    },1000);
}






/**
 * <sketchProc><library>----<?>
 * proposito: compila nuestro código y lo presenta en la ventana de visualización. Es lo mismo que pulsar el botón "PLAY".
 */
function sketchProc(processing) {
  
  processing.setup = function () {
    processing.frameRate(4); // FPS
    processing.size(WIDTH, HEIGHT);//Load canvas
    
    gblue = processing.loadImage("images/blue.png");//Carga un fantasma azul
    goran = processing.loadImage("images/orange.png");//Carga un fantasma naranja
    gpink = processing.loadImage("images/pink.png");//Carga un fantasma rosa
    gred = processing.loadImage("images/red.png");//Carga un fantasma rojo
    PACMANL= processing.loadImage("images/pacmanleft2.png");//Carga  imagen PacmanLeft  
    PACMANR = processing.loadImage("images/pacmanright2.png");//Carga  imagen PacmanRight 
    PACMANU = processing.loadImage("images/pacmanup2.png");//Carga  imagen PacmanUp
    PACMAND = processing.loadImage("images/pacmandown2.png");//Carga  imagen PacmanDown
    PACMANC = processing.loadImage("images/pacmanclose2.png");//Carga  imagen PacmanClose

    //Condiciones iniciales
    processing.state = {
      time:0,
      score:0,
      pacman:{x:9,y:16,dir:"L"},
      ghosthb:{x:1,y:1},
      ghostho:{x:5,y:16},
      ghosthp:{x:12,y:1},
      ghosthr:{x:12,y:1},
    }
  }
/**
 * contracto: <drawGame><world>----<world>
 * proposito: Dibuja en el canvas el mundo.
 *  
 */
  processing.drawGame = function (world) {
    //console.log(world.pacman.x, world.pacman.y)
    processing.background(0,0,0)
    
    forEach(MAPA, (fila, i) =>{
      forEach(fila, (block, j) =>{

      //Dibuja el Pacman
        if(block == 1){
          if(world.pacman.dir == "L" && world.time % 2 == 0){
            processing.image(PACMANL,world.pacman.x * BSIZE,world.pacman.y * BSIZE,22,22);
          }
          else if(world.pacman.dir == "R" && world.time % 2 == 0){
            processing.image(PACMANR,world.pacman.x * BSIZE,world.pacman.y * BSIZE,22,22);
          }
          else if(world.pacman.dir == "U" && world.time % 2 == 0){
            processing.image(PACMANU,world.pacman.x * BSIZE,world.pacman.y * BSIZE,22,22);
          }
          else if(world.pacman.dir == "D" && world.time % 2 == 0){
            processing.image(PACMAND,world.pacman.x * BSIZE,world.pacman.y * BSIZE,22,22);
          }
          else{
            processing.image(PACMANC,world.pacman.x * BSIZE,world.pacman.y * BSIZE,22,22);  
          }
      }
    
        //Dibuja los bloques
        if(block == 2){
          processing.fill(0,255,0);
          processing.rect(j*BSIZE, i*BSIZE, BSIZE-2, BSIZE-2,5,5,5);
        }
        //Dibuja una galleta
        if(block == 3){
          if(world.time % 2 == 1){
          processing.fill(250, 200 , 30);
          processing.ellipse(j*BSIZE+BSIZE/2, i*BSIZE+BSIZE/2, BSIZE/3, BSIZE/3)
          }
          else{
          processing.fill(250, 200 , 255);
          processing.ellipse(j*BSIZE+BSIZE/2, i*BSIZE+BSIZE/2, BSIZE/5, BSIZE/5)
          }
        }
        //Dibuja una galleta grande
        if(block == 4){
          if(world.time % 2 == 1){
          processing.fill(250, 200 , 30);
          processing.ellipse(j*BSIZE+BSIZE/2, i*BSIZE+BSIZE/2, BSIZE/1.5, BSIZE/1.5)
          }
          else{
          processing.fill(250, 200 , 255);
          processing.ellipse(j*BSIZE+BSIZE/2, i*BSIZE+BSIZE/2, BSIZE/2, BSIZE/2)
          }
        }
        //Dibuja Vidas
        if(block == "life"){
          processing.fill(255, 255, 0); //Pacman Color
          processing.arc(j * BSIZE+BSIZE/2, 
            i * BSIZE+BSIZE/2, BSIZE, BSIZE,-Math.PI * 3 / 4, Math.PI * 3 / 4);
        }
        
        //Dibuja Fantasmas
        if(block == 5){
          processing.image(gblue,j * BSIZE,i * BSIZE,22,22) 
        }
        
        if(block == 6){
          processing.image(gred,j * BSIZE,i * BSIZE,22,22) 
        }

        if(block == 7){
          processing.image(goran,j * BSIZE,i * BSIZE,22,22) 
        }

        if(block == 8){
          processing.image(gpink,j * BSIZE,i * BSIZE,22,22) 
        }
      
      });
    });

 
    
    /**
     * contrato:<textSize><num>-><?>
     * 	Establece el tamaño de fuente actual. El tamaño de fuente se mide en unidades de píxeles.
     */
    processing.textSize(20);
    //Dibuja texto en la pantalla. Muestra posición especificada por los parámetros adicionales
    
    processing.text("HIGH SCORE",220,500);
    processing.text(world.score,220,520); //Actualiza el puntaje y lo muestra en la interfaz

    const se = processing.second();
    const mi = processing.minute();
    const ho = processing.hour();
    var temp = processing.nf(ho,2) +":"+ processing.nf(mi,2) +":"+ processing.nf(se,2)

    processing.text(temp,110,500)
    
    crono2();
    
    if (seconds < 10){
      var secs = "0" + seconds;
    }
    else{
      var secs = seconds;
    }
    if(minutes < 10){
      var mins =  "0" + minutes;
    }else{
      var mins = minutes;
    }
  
    var temp2 = mins + ":" + secs;
    processing.text(temp2,110,520)

 
  }
  


/**
* Contrato: <.onKeyEvent> <world> <keyCode> ---> <make>
* Propósito: realizar una acción específica cuando se presiona una tecla en el teclado.
 * 
 */
processing.onKeyEvent = function(world, keyCode){
  console.log(keyCode)
  
  if(keyCode == processing.LEFT  ){ //Representa hacia donde se dará el movimiento del pacman

    waka.play()
    waka.volume = 0.03;

    if( MAPA[world.pacman.y][world.pacman.x -  1] == 0){ //Mueve el pacman a la izquierda si no hay bloqueo
      MAPA[world.pacman.y][world.pacman.x -  1] = 1 //Reemplaza con 1 para representar la posición del pacman
      MAPA[world.pacman.y][world.pacman.x] = 0 //La posición anterior la deja vacía 
    return make(world, {
      pacman:{
        x: world.pacman.x - 1,
        y: world.pacman.y,
        dir: "L"
      }
    })
    }
    else if(MAPA[world.pacman.y][world.pacman.x - 1 ] == 3){ //Mueve el pacman a la izquierda y se come la galleta
      MAPA[world.pacman.y][world.pacman.x - 1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x - 1,
          y: world.pacman.y,
          dir: "L"
        },
        score: world.score = world.score + 1
      })
    }
    else if(MAPA[world.pacman.y][world.pacman.x - 1 ] == 4){ //Mueve el pacman a la izquierda y se come la galleta
      MAPA[world.pacman.y][world.pacman.x - 1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x - 1,
          y: world.pacman.y,
          dir: "L"
        },
        score: world.score = world.score + 20
      })
    }
    else if(MAPA[world.pacman.y][world.pacman.x - 1 ] == 11){ //Teletransporta el pacman del pasillo al izquierdo al  derecho
      MAPA[world.pacman.y][world.pacman.x - 1] = 11
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: 17,
          y: world.pacman.y,
          dir: "L"
        }
      })
    }
    //reinicia cuanto toca fantasma 
    else if(MAPA[world.pacman.y][world.pacman.x - 1 ]==5 ||MAPA[world.pacman.y][world.pacman.x - 1 ]==6 || MAPA[world.pacman.y][world.pacman.x - 1 ]==7 || MAPA[world.pacman.y][world.pacman.x - 1 ]==8){
      
      ghostD.play()
      ghostD.volume = 0.06;
      MAPA[world.pacman.y][world.pacman.x] = 0
      MAPA[21][2]==0

      return  processing.state = {
      time:world.time,
      score:world.score,
      pacman:{x:9,y:16,dir:"L"},
      ghosthb:{x:1,y:1},
      ghostho:{x:5,y:16},
      ghosthp:{x:12,y:1},
      ghosthr:{x:12,y:1},
    }
    }
    else{ //Si no ocurre ninguna de las anteriores es porque hay un bloque entonces no deja mover el pacman
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y,
          dir: "L"
        }
      })
    }
    } 

  if(keyCode == processing.RIGHT){
    waka.play()
    waka.volume = 0.03;
  
    if( MAPA[world.pacman.y][world.pacman.x +  1] == 0){
      MAPA[world.pacman.y][world.pacman.x +  1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
    return make(world, {
      pacman:{
        x: world.pacman.x + 1,
        y: world.pacman.y,
        dir: "R"
      }
    })
    }
    else if(MAPA[world.pacman.y][world.pacman.x +1 ] == 3){
      MAPA[world.pacman.y][world.pacman.x + 1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x + 1,
          y: world.pacman.y,
          dir: "R"
        },
        score: world.score = world.score + 1
      })
    }
    else if(MAPA[world.pacman.y][world.pacman.x +1 ] == 4){
      MAPA[world.pacman.y][world.pacman.x + 1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x + 1,
          y: world.pacman.y,
          dir: "R"
        },
        score: world.score = world.score + 20
      })
    }
    else if(MAPA[world.pacman.y][world.pacman.x + 1 ] == 12){//Teletransporta el pacman del pasillo derecho al  izquierdo
      MAPA[world.pacman.y][world.pacman.x + 1] = 12
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: 1,
          y: world.pacman.y,
          dir: "R"
        }
      })
    }
    else if(MAPA[world.pacman.y][world.pacman.x + 1 ]==5 ||MAPA[world.pacman.y][world.pacman.x + 1 ]==6 || MAPA[world.pacman.y][world.pacman.x + 1 ]==7 || MAPA[world.pacman.y][world.pacman.x + 1 ]==8){
      ghostD.play()
      ghostD.volume = 0.06;
      
      MAPA[world.pacman.y][world.pacman.x] = 0
      

      return  processing.state = {
      time:world.time,
      score:world.score,
      pacman:{x:9,y:16,dir:"L"},
      ghosthb:{x:1,y:1},
      ghostho:{x:5,y:16},
      ghosthp:{x:12,y:1},
      ghosthr:{x:12,y:1},
      
    }
    }else{
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y,
          dir: "R"
        }
      })
    }
  }
  

  
  
  if(keyCode == processing.UP){
    waka.play()
    waka.volume = 0.03;
    
    if( MAPA[world.pacman.y - 1][world.pacman.x] == 0){
      MAPA[world.pacman.y - 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
    return make(world, {
      pacman:{
        x: world.pacman.x,
        y: world.pacman.y - 1,
        dir: "U"
      }
     
    })
    }
    else if(MAPA[world.pacman.y - 1][world.pacman.x] == 3){
      MAPA[world.pacman.y - 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y - 1,
          dir: "U"
        },
        score: world.score = world.score + 1
      })
    }
    else if(MAPA[world.pacman.y - 1][world.pacman.x] == 4){
      MAPA[world.pacman.y - 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y - 1,
          dir: "U"
        },
        score: world.score = world.score + 20
      })
    }
    else if(MAPA[world.pacman.y - 1][world.pacman.x]==5 ||MAPA[world.pacman.y - 1][world.pacman.x]==6 || MAPA[world.pacman.y - 1][world.pacman.x]==7 || MAPA[world.pacman.y - 1][world.pacman.x]==8){
      
      ghostD.play()
      ghostD.volume = 0.06;
      MAPA[world.pacman.y][world.pacman.x] = 0

      return  processing.state = {
      time:world.time,
      score:world.score,
      pacman:{x:9,y:16,dir:"L"},
      ghosthb:{x:1,y:1},
      ghostho:{x:5,y:16},
      ghosthp:{x:12,y:1},
      ghosthr:{x:12,y:1},
    }
    }else{
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y,
          dir: "U"
        }
      })
    }
  }
  
  if(keyCode == processing.DOWN){
    waka.play()
    waka.volume = 0.03;
    

    if(world.time % 4 !== 0 ){
      processing.image(PACMAND,world.pacman.x * BSIZE,world.pacman.y * BSIZE,22,22);
    }


    if( MAPA[world.pacman.y + 1][world.pacman.x] == 0){
      MAPA[world.pacman.y + 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
    return make(world, {
      pacman:{
        x: world.pacman.x,
        y: world.pacman.y + 1,
        dir: "D"
      }
    })
    }
    else if(MAPA[world.pacman.y + 1][world.pacman.x] == 3){
      MAPA[world.pacman.y + 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y + 1,
          dir: "D"
        },
        score: world.score = world.score + 1
      })
    }
    else if(MAPA[world.pacman.y + 1][world.pacman.x] == 4){
      MAPA[world.pacman.y + 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y + 1,
          dir: "D"
        },
        score: world.score = world.score + 20
      })
    }
    else if(MAPA[world.pacman.y + 1][world.pacman.x]==5 ||MAPA[world.pacman.y + 1][world.pacman.x]==6 || MAPA[world.pacman.y + 1][world.pacman.x]==7 || MAPA[world.pacman.y + 1][world.pacman.x]==8){
      
      ghostD.play()
      ghostD.volume = 0.06;
      MAPA[world.pacman.y][world.pacman.x] = 0

      return  processing.state = {
      time:world.time,
      score:world.score,
      pacman:{x:9,y:16,dir:"L"},
      ghosthb:{x:1,y:1},
      ghostho:{x:5,y:16},
      ghosthp:{x:12,y:1},
      ghosthr:{x:12,y:1},
    }
    }else{
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y,
          dir: "D"
        }
      })
    }
    }
  }
   
  

  /**
   * Cambia la posición del objeto moviendolo 1 unidad a la derecha. 
   */
  processing.onTic = function(world) {
    return make(world, { time: world.time + 1 , 
    pacman: { x: world.pacman.x, y: world.pacman.y  } });
  }

  processing.onMouseEvent = function (world, event) {
    return make(world, {});
  }

  // ******************** De aquí hacia abajo no debe cambiar nada. ********************

  // Esta es la función que pinta todo. Se ejecuta 60 veces por segundo. 
  // No cambie esta función. Su código debe ir en drawGame
  processing.draw = function () {
    processing.drawGame(processing.state);
    processing.state = processing.onTic(processing.state);
  };
  // Esta función se ejecuta cada vez que presionamos una tecla. 
  // No cambie esta función. Su código debe ir en onKeyEvent
  processing.keyPressed = function () {
    processing.state = processing.onKeyEvent(processing.state, processing.keyCode);
  }
  // Esta función se ejecuta cada vez movemos el mouse. 
  // No cambie esta función. Su código debe ir en onKeyEvent
  processing.mouseMoved = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "move", mouseX: processing.mouseX, mouseY: processing.mouseY });
  }

  // Estas funciones controlan los eventos del mouse. 
  // No cambie estas funciones. Su código debe ir en OnMouseEvent
  processing.mouseClicked = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "click", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mouseDragged = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "drag", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mousePressed = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "press", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mouseReleased = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "release", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }
  // Fin de los eventos del mouse
}

var canvas = document.getElementById("canvas");
// Adjuntamos nuestro sketch al framework de processing
var processingInstance = new Processing(canvas, sketchProc);