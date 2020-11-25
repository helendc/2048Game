// import keypress from '/node_modules/keypress';
import Game from "./engine/game.js";

let game = new Game(4);
game.setupNewGame();
updateTiles();

// game.loadGame(
//     {
//         //board: [0,0,0,0,0,0,0,0,1024,1024,0,0,0,0,0,0],
//         board: [4,3,5,7,8,9,10,11,1024,1024,7,8,9,0,10,20],
//         over: false,
//         score: 2048,
//         won: false,
//     }
// );
// updateTiles();
// updateScore();

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      case "Down": 
      case "ArrowDown":
        game.move("down");
        break;
      case "Up": 
      case "ArrowUp":
        game.move("up");
        break;
      case "Left": 
      case "ArrowLeft":
        game.move("left");
        break;
      case "Right": 
      case "ArrowRight":
        game.move("right");
        break;
      case "Enter":
        break;
      case "Esc": 
      case "Escape":
        break;
      default:
        return; 
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);

game.onMove(updateTiles);
game.onMove(updateScore);

game.onWin(win);
game.onLose(lost);

//document.getElementById("root").onkeypress = updateTiles
document.getElementById("reset").onclick = reset;

function updateTiles(){
    let index=0;
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            // update tile values
            let id = "" +i +j;
            document.getElementById(id).innerHTML = "" + game.gameState.board[index];
            index++;
        }
    }
}

function updateScore(){
    document.getElementById("score").value = "" + game.gameState.score;
}

function reset(){
    game.setupNewGame();
    updateTiles();
    updateScore();
}

function win() {
    document.getElementById("status").value='You Won :D';
    document.getElementById("status").style.backgroundColor="#FF33E6";

}

function lost() {
    document.getElementById("status").value='You Lost X(';
    document.getElementById("status").style.backgroundColor="#FF33E6";
}

