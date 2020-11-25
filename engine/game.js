export default class Game {
    constructor(dimensions){
        this.dimensions = dimensions;
        this.setupNewGame();
    }

    setupNewGame(){
        //console.log("setting up new game");
        let empty = new Array(this.dimensions*this.dimensions);

        for(let i = 0; i<this.dimensions*this.dimensions; i++){
            empty[i] = 0;
        }

        this.gameState = {
            board: empty,
            score: 0,
            won: false,
            over: false,
        };

        this.randomTiles();
        this.randomTiles();

        this.moveListeners = [];
        this.winListeners = [];
        this.overListeners = [];
    }

    create2D(){
        //console.log('creating 2d');
        let twoD = new Array(this.dimensions);
        let ind = 0;
        while (ind<this.dimensions){
            twoD[ind] = new Array(this.dimensions);
            ind++;
        }
        for(let i = 0; i<this.dimensions; i++){
            for(let j=0; j<this.dimensions;j++){
                twoD[i][j] = 0;
            }
        }        
        let index = 0;
        for(var i=0; i<this.dimensions; i++){    // fill in board
            for(var j=0; j<this.dimensions; j++){
                twoD[i][j] = this.gameState.board[index];
                index++;
            }
        }
        return twoD;
    }
    update1DBoard(twoD){
        //console.log('update 1d');  
        let index = 0;
        for(var i=0; i<this.dimensions; i++){    // fill in board
            for(var j=0; j<this.dimensions; j++){
                this.gameState.board[index] = twoD[i][j];
                index++;
            }
        }
    }
    randomTiles(){
        //console.log("adding random tiles");
        let twoD = this.create2D();
        // 90% chance of 2, 10% chance of 4
        let theTile = 0;
        if(Math.random() < 0.9){
            theTile = 2;
        }else{
            theTile = 4;
        }

        let foundTile = false;
        while(!foundTile){
            let randRow = Math.floor(Math.random()*this.dimensions);
            let randCol = Math.floor(Math.random()*this.dimensions);
            
            if(twoD[randRow][randCol] == 0){
                twoD[randRow][randCol] = theTile;
                this.update1DBoard(twoD);
                foundTile = true;
            }
        }
    }

    loadGame(gameState){
        //console.log("load game");
        this.gameState.board = gameState.board;
        this.gameState.score = gameState.score;
        this.gameState.won = gameState.won;
        this.gameState.over = gameState.over;
        //this.toString();
    }

    move(direction){
        let twoD = this.create2D();
        if(direction == "up"){this.moveUp(twoD);}
        if(direction == "down"){this.moveDown(twoD);}
        if(direction == "left"){this.moveLeft(twoD);}
        if(direction == "right"){this.moveRight(twoD);}
        // board is updated in move methods ^

        if(this.hasWon()){     // UPDATE WON
            this.gameState.won = true;
        }
        if(this.hasEmpty()){
            this.randomTiles();         //adds random tile
        }
        if(!this.canMove()){        // UPDATE OVER    
            this.gameState.over = true;
        }

        this.updateMoveListeners(); 
        if(this.gameState.won){this.updateWinListeners();}
        if(this.gameState.over){this.updateOverListeners();}
        //console.log("finished move");
    }

    moveUp(twoD){ // scan from top down
        //console.log("moving up");
        for(var i=0; i<this.dimensions; i++){           //SHIFT LOOP
            for(var j=0; j<this.dimensions; j++){
                if(j+1 != this.dimensions){ // bounds
                    if(twoD[j][i] == 0 && twoD[j+1][i] !=0){
                        twoD[j][i] = twoD[j+1][i];      // SHIFT OG TWO CELLS
                        twoD[j+1][i] = 0;                
                        
                        let index1 = j-1;                           // NOW CHECK ABOVE IT
                        let index2 = j;
                        while(index1 >= 0){
                            if(twoD[index1][i]==0){
                                twoD[index1][i] = twoD[index2][i];
                                twoD[index2][i] = 0;
                                index2--;
                            }
                            index1--;
                        }
                    }
                }
            }
        }
        // console.log("after shifting: ");
        // console.log(this.toString());
        for(var i=0; i<this.dimensions; i++){                       // MERGING LOOP
            for(var j=0; j<this.dimensions; j++){
                if(j+1 != this.dimensions && twoD[j][i]!=0){  // bounds
                    // check for merge 
                    if(twoD[j][i]==twoD[j+1][i]){
                        twoD[j][i] += twoD[j][i]; // add them
                        this.gameState.score += twoD[j][i];
                        //console.log("score: " + this.gameState.score);

                        let index1 = j+1;
                        while(index1 < this.dimensions){
                            if(index1==this.dimensions-1){
                                twoD[index1][i] = 0;
                            }else{
                                twoD[index1][i] = twoD[index1 +1][i];
                            }
                            index1++;
                        }
                    }
                }
            }
        }
        this.update1DBoard(twoD);
        //console.log("after merge:");
        // console.log(this.toString());
    }
    moveDown(twoD){ // scan from bottom up
        //console.log("moving down");
        for(var i=0; i<this.dimensions; i++){           //SHIFT LOOP
            for(var j=this.dimensions-1; j>=0; j--){
                if(j != 0){ // bounds
                    if(twoD[j][i] == 0 && twoD[j-1][i] !=0){
                        twoD[j][i] = twoD[j-1][i];      // SHIFT OG TWO CELLS
                        twoD[j-1][i] = 0;                
                        
                        let index1 = j+1;                           // NOW CHECK ABOVE IT
                        let index2 = j;
                        while(index1 < this.dimensions){
                            if(twoD[index1][i]==0){
                                twoD[index1][i] = twoD[index2][i];
                                twoD[index2][i] = 0;
                                index2++;
                            }
                            index1++;
                        }
                    }
                }
            }
        }
        // console.log("after shifting: ");
        // console.log(this.toString());
        for(var i=0; i<this.dimensions; i++){                       // MERGING LOOP
            for(var j=this.dimensions-1; j>=0; j--){
                if(j != 0 && twoD[j][i]!=0){  // bounds
                    // check for merge 
                    if(twoD[j][i]==twoD[j-1][i]){
                        twoD[j][i] += twoD[j][i]; // add them
                        this.gameState.score += twoD[j][i];         // UPDATE SCORE 

                        let index1 = j-1;
                        while(index1 >= 0){
                            if(index1==0){
                                twoD[index1][i] = 0;
                            }else{
                                twoD[index1][i] = twoD[index1 -1][i];
                            }
                            index1--;
                        }
                    }
                }
            }
        }
        this.update1DBoard(twoD);
        // console.log("after merge:");
        // console.log(this.toString());
    }
    moveRight(twoD){ // scan from right to left
        //console.log("moving right");
        for(var i=0; i<this.dimensions; i++){           //SHIFT LOOP
            for(var j=this.dimensions-1; j>=0; j--){
                if(j != 0){ // bounds
                    if(twoD[i][j] == 0 && twoD[i][j-1] !=0){
                        twoD[i][j] = twoD[i][j-1];      // SHIFT OG TWO CELLS
                        twoD[i][j-1] = 0;                
                        
                        let index1 = j+1;                           // NOW CHECK ABOVE IT
                        let index2 = j;
                        while(index1 < this.dimensions){
                            if(twoD[i][index1]==0){
                                twoD[i][index1] = twoD[i][index2];
                                twoD[i][index2] = 0;
                                index2++;
                            }
                            index1++;
                        }
                    }
                }
            }
        }
        // console.log("after shifting: ");
        // console.log(this.toString());
        for(var i=0; i<this.dimensions; i++){                       // MERGING LOOP
            for(var j=this.dimensions-1; j>=0; j--){
                if(j != 0 && twoD[i][j]!=0){  // bounds
                    // check for merge 
                    if(twoD[i][j]==twoD[i][j-1]){
                        twoD[i][j] += twoD[i][j]; // add them
                        this.gameState.score += twoD[i][j];            // UPDATE SCORE

                        let index1 = j-1;
                        while(index1 >=0){
                            if(index1 == 0){
                                twoD[i][0]=0;
                            }else{
                                twoD[i][index1] = twoD[i][index1 -1];
                            }
                            index1--;
                        }
                    }
                }
            }
        }
        this.update1DBoard(twoD);
        // console.log("after merge:");
        // console.log(this.toString());
    }
    moveLeft(twoD){ // scan from left to right
        //console.log("moving left");
        for(var i=0; i<this.dimensions; i++){           //SHIFT LOOP
            for(var j=0; j<this.dimensions; j++){
                if(j != this.dimensions-1){ // bounds
                    if(twoD[i][j] == 0 && twoD[i][j+1] !=0){
                        //console.log("shifting" + twoD[i][j+1] );
                        twoD[i][j] = twoD[i][j+1];      // SHIFT OG TWO CELLS
                        twoD[i][j+1] = 0;                
                        
                        let index1 = j-1;                           // NOW CHECK ABOVE IT
                        let index2 = j;
                        while(index1 >=0){
                            if(twoD[i][index1]==0){
                                twoD[i][index1] = twoD[i][index2];
                                twoD[i][index2] = 0;
                                index2--;
                            }
                            index1--;
                        }
                    }
                }
            }
        }
        //console.log("after shifting: ");
        // console.log(this.toString());
        for(var i=0; i<this.dimensions; i++){                       // MERGING LOOP
            for(var j=0; j<this.dimensions; j++){
                if(j != this.dimensions-1 && twoD[i][j]!=0){  // bounds
                    // check for merge 
                    if(twoD[i][j]==twoD[i][j+1]){
                        twoD[i][j] += twoD[i][j]; // add them
                        //console.log("merging" + twoD[i][j]);
                        this.gameState.score += twoD[i][j];         // UPDATE SUM

                        let index1 = j+1;
                        while(index1 < this.dimensions){
                            //console.log("checking more");
                            if(index1 == this.dimensions-1){
                                twoD[i][index1]=0;
                            }else{
                                twoD[i][index1] = twoD[i][index1 +1];
                            }
                            index1++;
                        }
                    }
                }
            }
        }
        this.update1DBoard(twoD);
        //console.log("after updated 1d:");
        // console.log(this.toString());
    }
    hasWon(){
        let twoD = this.create2D();
        for(var row=0; row<this.dimensions; row++){    
            for(var col=0; col<this.dimensions; col++){
                if(twoD[row][col]==2048){
                    //console.log("found a 0");
                    return true;
                }
            }
        }
    }
    hasEmpty(){
        let twoD = this.create2D();
        for(var row=0; row<this.dimensions; row++){    
            for(var col=0; col<this.dimensions; col++){
                if(twoD[row][col]==0){
                    //console.log("found a 0");
                    return true;
                }
            }
        }
    }
    canMove(){
        //console.log("checking for valid moves");
        //check for empty tiles
        let twoD = this.create2D();
        for(var row=0; row<this.dimensions; row++){    
            for(var col=0; col<this.dimensions; col++){
                if(twoD[row][col]==0){
                    //console.log("found a 0");
                    return true;
                }
            }
        }
        // if (twoD.some((row)=>{row.includes(0);})){
        //     return true;
        // }
        //check if any two cells can be added together
        for(var row=0; row<this.dimensions; row++){    
            for(var col=0; col<this.dimensions; col++){
                // check to right 
                if(col != this.dimensions-1){  // last col
                    if(twoD[row][col] == twoD[row][col+1]){
                        //console.log("found a match1");
                        return true;
                    }
                }
                // check to left
                if(col != 0){   // first col
                    if(twoD[row][col] == twoD[row][col-1]){
                        //console.log("found a match2");
                        return true;
                    }
                }
                // check above
                if(row != 0){   // first row
                    if(twoD[row][col] == twoD[row-1][col]){
                        //console.log("found a match3");
                        return true;
                    }
                }
                // check below 
                if(row!= this.dimensions-1){ // last row 
                    if(twoD[row][col] == twoD[row+1][col]){
                        //console.log("found a match4");
                        return true;
                    }
                }
            }
        }
        return false; // no empty tiles, no tiles to add 
    }

    toString(){
        // string rep of game as text/ascii
        let twoD = this.create2D();
        let row = 0;
        while(row < this.dimensions){
            let col = 0;
            let toPrint = "";
            while(col < this.dimensions){
                toPrint += "[" + twoD[row][col] + "] ";
                col++;
            }
            row++;
            console.log(toPrint);
        }
    }

    updateWinListeners(){  // calls every function in listener array
        //console.log("updating winListen:");
        for (let i = 0; i < this.winListeners.length; i++) {
            this.winListeners[i](this.gameState);
        }
    }
    updateOverListeners(){  // calls every function in listener array
        //console.log("updating overListen:");
        for (let i = 0; i < this.overListeners.length; i++) {
            this.overListeners[i](this.gameState);
        }
    }
    updateMoveListeners(){  // calls every function in listener array
        //console.log("updating moveListen:");
        for (let i = 0; i < this.moveListeners.length; i++) {
            this.moveListeners[i](this.gameState);
        }
    }

    onMove(callback){
        //console.log("onMove");
        this.moveListeners.push(callback);
    }

    onWin(callback){
        //console.log("onWin");
        this.winListeners.push(callback);
    }

    onLose(callback){
        //console.log("onLose");
        this.overListeners.push(callback);
    }
    
    getGameState(){   // return the current gamestate
        return this.gameState;
    }

}
