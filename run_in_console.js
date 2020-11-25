import keypress from 'keypress';
import Game from "./engine/game";

keypress(process.stdin);


/**
 * The code in this file is used to run your game in the console. Use it
 * to help develop your game engine.
 *
 */


// let game = new Game(4);
// game.toString();

game.onMove(gameState => {
    game.toString();
    console.log(game.gameState);
});

game.onWin(gameState => {
    console.log('You won with a gameState of...', gameState)
});

game.onLose(gameState => {
    console.log('You lost! :(', gameState)
    console.log(`Your score was ${gameState.score}`);
});
console.log("hi");
process.stdin.on('keypress', function (ch, key) {
    console.log("hello");
    switch (key.name) {
        case 'right':
            game.move('right');
            break;
        case 'left':
            game.move('left');

            break;
        case 'down':
            game.move('down');

            break;
        case 'up':
            game.move('up');
            break;
    }
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
});


process.stdin.setRawMode(true);
process.stdin.resume();


//TEST ONE 
let myGameState ={};
myGameState.board = [
    0, 2, 4, 8,
    0, 0, 32, 32,
    4, 8, 8, 2,
    2, 2, 2, 256
];
myGameState.score =2032;
myGameState.won =false;
myGameState.over = false;

let myGame = new Game(4);

myGame.loadGame(myGameState);
console.log("LOAD:");
console.log(myGame.getGameState());
myGame.toString();
// myGame.onMove(gameState => {
//     console.log("i moved!");
// });

// myGame.onWin(gameState => {
//     console.log("i won!");
// });
console.log("LEFT:");
myGame.move("left");
console.log(myGame.getGameState());
myGame.toString();

// console.log("RIGHT:");
// myGame.move("right");
// console.log(myGame.getGameState());
// myGame.toString();

// console.log("UP:");
// myGame.move("up");
// console.log(myGame.getGameState());
// myGame.toString();
// // AT THIS POINT CALLBACKS NEED TO HAPPY

//TEST TWO 
// let myGameState2 ={};
// myGameState2.board = [
//     32, 16, 32, 16, 
//     8, 2, 16, 8, 
//     32, 8, 0, 32,
//     8, 16, 64, 16
// ];
// myGameState2.score =2;
// myGameState2.won =false;
// myGameState2.over = false;

// let myGame2 = new Game(4);

// myGame2.loadGame(myGameState2);
// console.log("LOAD:");
// console.log(myGame2.getGameState());
// myGame2.toString();
// myGame2.onLose(gameState => {
//     console.log("i lost!");
// });
// myGame2.onMove(gameState => {
//     console.log("i moved!");
// });
// console.log("right:");
// myGame2.move("right");
// console.log(myGame2.getGameState());
// myGame2.toString();
// AT THIS POINT OVER CALL BACKS SHOULD HAVE BEEN AMDE 


// let myGameState ={};
// myGameState.board = [
//     0, 0, 2, 4, 
//     0, 2, 0, 4, 
//     0, 0, 1024, 8,
//     2, 4, 1024, 16
//   ];
// myGameState.score =1024;
// myGameState.won =false;
// myGameState.over = false;

// let myGame = new Game(4);
// console.log("new:");
// console.log(myGame.getGameState());
// myGame.toString();

// myGame.loadGame(myGameState);
// console.log("load game:");
// console.log(myGame.getGameState());
// myGame.toString();

// console.log("up:");
// myGame.move("up");
// console.log(myGame.getGameState());
// myGame.toString();

// console.log("reset:");
// myGame.setupNewGame();
// console.log(myGame.getGameState());
// myGame.toString();

// console.log("up:");
// myGame.move("up");
// console.log(myGame.getGameState());
// myGame.toString();

// console.log("down:");
// myGame.move('down');
// console.log(myGame.getGameState());
// myGame.toString();

// console.log("right:");
// myGame.move('right');
// console.log(myGame.getGameState());
// myGame.toString();

// console.log("left:");
// myGame.move('left');
// console.log(myGame.getGameState());
// myGame.toString();



