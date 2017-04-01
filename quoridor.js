 //docReady(function() { 
	// initQuoridorDOM();
	

// });
//http://www.javascripter.net/faq/colornam.htm

var BOARD_BACKGROUND_COLOR = "palegreen" ;
var BOARD_WIDTH = 1000;
var BOARD_HEIGHT = 1500;
var BOARD_SCALE = 0.4;
var BOARD_X_OFFSET = 50;
var BOARD_Y_OFFSET = 300;
var SOUND_ENABLED_AT_STARTUP = false;

var BOARD_X_OFFSET_SCALED = BOARD_X_OFFSET * BOARD_SCALE;
var BOARD_Y_OFFSET_SCALED = BOARD_Y_OFFSET * BOARD_SCALE;
var BOARD_SQUARE_SPACING = 100;
var BOARD_LINE_COLOR = "white";
var BOARD_LINE_HOVER_WALL_POSSIBLE_COLOR = "grey";
var BOARD_LINE_HOVER_WALL_NOT_POSSIBLE_COLOR = "red";

var BOARD_LINE_SIDE_COLOR = "grey";
var BOARD_PAWN_RADIUS = 35;
var BOARD_PAWN_1_COLOR = "lightskyblue";
var BOARD_PAWN_2_COLOR = "lightsalmon";
var BOARD_CELL_PAWNCIRCLE_COLOR_ILLEGAL_MOVE_HOVER = "red";
var BOARD_CELL_PAWNCIRCLE_COLOR_INACTIVE = BOARD_BACKGROUND_COLOR;
var BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_1 = "paleturquoise";
// var BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_1_ACTIVATED = "deepskyblue";
var BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_1_ACTIVATED = "paleturquoise";
var BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_2 = "peachpuff";
var BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_2_ACTIVATED  = "peachpuff";
// var BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_2_ACTIVATED  = "salmon";

var WALL_START_DISTANCE_FROM_BOARD_X = 80;
var WALL_START_DISTANCE_FROM_BOARD_Y = 20	;
var WALL_START_DISTANCE_FROM_EACH_OTHER = 93;

var WALL_WIDTH = 14;
var WALL_LENGTH = 2*BOARD_SQUARE_SPACING - WALL_WIDTH-10;
// var WALL_COLOR = "steelblue";
var WALL_COLOR = "teal";

var DIRECTIONS_VERBOSE = ["n","e","s","w","ne","se","sw","nw","nn","ee","ss","ww"];
var NORTH = 0;
var EAST = 1
var SOUTH = 2;
var WEST = 3;
var NORTHEAST = 4;
var SOUTHEAST= 5;
var SOUTHWEST=6;
var NORTHWEST=7;
var NORTHNORTH = 8;
var EASTEAST = 9;
var SOUTHSOUTH = 10;
var WESTWEST = 11;
 
var PLAYER1 = 0;
var PLAYER2 = 1;
GAME_REPLAY_TIME_BETWEEN_MOVES_MILLIS = 700;
//GAME_REPLAY_TIME_BETWEEN_MOVES_MILLIS = 70;
PRINT_ASSERT_ERRORS = false;

//game status
var SETUP =0;
var PLAYING=1;
var FINISHED=2;


var FINISH_CELLS_LOOKUP_TABLE = [[0,1,2,3,4,5,6,7,8],[72,73,74,75,76,77,78,79,80]]; //valid finish cellIDs for player 1 and player 2

document.addEventListener("DOMContentLoaded", function() {

   //var map = {a:{b:3,c:1,d:3},b:{a:2,c:1,d:1},c:{a:4,b:1},d:{a:8,b:1}};
   
  // var test = {};
   
  // test[0]=[1,2,3];
  // test[1]=[3,4,2];
//test[1].push(5);
  // 
	//console.log(test);
	//graph = new Graph(map);
	//console.log(graph.findShortestPath('a', 'b'));
	//console.log(graph.findPaths('a'));
	
	
	
	initQuoridorDOM();
});




function initQuoridorDOM(){
	var quoridorField = document.getElementById("quoridor-field");
	//addDiv(setShowField, "card");
	addSvg(quoridorField, "quoridorFieldSvg",BOARD_WIDTH*BOARD_SCALE, BOARD_HEIGHT*BOARD_SCALE,BOARD_BACKGROUND_COLOR,"black");
	var statsDiv = document.createElement('div');
	statsDiv.id = 'statsDiv';
	statsDiv.className = 'stats';
	//document.getElementById('statsDiv').innerHTML += '<br>Some new content!';
	
	statsDiv.innerHTML += '<br>TestGame';
	quoridorField.appendChild(statsDiv);
	
	var field = document.getElementById("quoridorFieldSvg");		
	
	//movePawnToPosition(PLAYER1,NORTH);
	//console.log( pawns[0]);
	//movePawn(PLAYER1);
	
	
	// movePawn(PLAYER1, EAST);
	// movePawn(PLAYER2, EAST);
	// movePawn(PLAYER1, EAST);
	
	//window.setTimeout(movePawn(PLAYER2, EAST),2000);
	
	
	//recordedGame = [EAST];
	moveCounter = 0;
	//window.setTimeout(callback(PLAYER1, EAST),GAME_REPLAY_TIME_BETWEEN_MOVES_MILLIS); 
	var aGame = new Game(field);
	
	//aGame.placeWallByVerboseNotation(PLAYER1, "1h");
//	aGame.testPlaceWall(PLAYER1, "h1");
	/*
	aGame.playTurnByVerboseNotation("N");
	aGame.playTurnByVerboseNotation("S");
	aGame.playTurnByVerboseNotation("N");
	aGame.playTurnByVerboseNotation("S");
	aGame.playTurnByVerboseNotation("N");
	aGame.playTurnByVerboseNotation("S");
	aGame.playTurnByVerboseNotation("N");
	aGame.playTurnByVerboseNotation("SS");
	 aGame.playTurnByVerboseNotation("N");
	 aGame.playTurnByVerboseNotation("S");
	 aGame.playTurnByVerboseNotation("N");
	 aGame.playTurnByVerboseNotation("S");
	 aGame.playTurnByVerboseNotation("N");
	
	
	
	aGame.playTurnByVerboseNotation("6d");
	aGame.playTurnByVerboseNotation("ne");
	aGame.playTurnByVerboseNotation("c5");
	aGame.playTurnByVerboseNotation("d5");
	aGame.playTurnByVerboseNotation("4d");
	
	
	
	//aGame.playTurnByVerboseNotation(PLAYER1, "sw");
	//aGame.playTurnByVerboseNotation(PLAYER2,"x");
	/**/
	//aGame.outputWalls();
	/*
	var movesHistory = ["n","s","n","s","n","s","3d","3g","e3","s","c4","sw","nw","nn","nn","w","n","s","n"];
	var replay = new GameReplay(aGame, movesHistory);
	replay.replay();
	/**/
}



function GameReplay (game, recordedMoves){
	//this.replayGame = new Game(); //init board
	this.replayGame = game;
	this.recordedGame = recordedMoves;
	//this.moveCounter = 0;
	console.log(this.replayGame);
}

GameReplay.prototype.replay = function (){

	if (this.replayGame.moveCounter < this.recordedGame.length){
		//console.log("player moving: %d",moveCounter%2 );
		// window.setTimeout(this.callback(moveCounter%2, this.recordedGame[moveCounter]),GAME_REPLAY_TIME_BETWEEN_MOVES_MILLIS); 
		window.setTimeout(function (){this.callback( this.recordedGame[this.replayGame.moveCounter])}.bind(this),GAME_REPLAY_TIME_BETWEEN_MOVES_MILLIS); 
	}
}

GameReplay.prototype.callback = function( verboseMove){
	// return function(){
			
       // this.qgame.movePawn(player, direction);
	   // this.moveCounter += 1;
	   
	   // this.replay(this.moveCounter);
    // }
	this.replayGame.playTurnByVerboseNotation( verboseMove);
	//this.moveCounter += 1;
	this.replay();
}

/*
function callback(player, direction){
    return function(){
       movePawn(player, direction);
	   moveCounter += 1;
	   gameReplay(moveCounter);
    }
}
*/


function Game(svgField){
	
	this.walls_1 = [];
	this.walls_2 = [];
	this.svgPawns = [];
	this.svgLineSegments = [];
	this.svgCellsAsPawnShapes = []
	
	//this.board;
	this.board = new Board();
	this.buildUpBoard(svgField);
	this.outputPawns();
	
	this.play_song();
	
	//administration
	this.playerAtMove = PLAYER1;
	this.recordingOfGameInProgress = [];
	this.moveCounter = 0;
	this.gameStatus = SETUP;
	
	this.indicateActivePlayer();
	this.outputGameStats();
	
	//testing:
	this.board.boardCellsToGraph(true);
	//console.log(this.board.boardGraph);
	
	//console.log(test);
	//var graph = new Graph(this.board.boardGraph);
	//console.log(graph.findShortestPath(4, 80));
	//console.log(graph.findPaths('a'));
	
	this.gameStatus = PLAYING;
}

//Game.prototype.playTurn





Game.prototype.wallToVerboseNotation = function(cellId, directionIsNorthToSouth){
	var row = 8 - Math.floor(cellId/9);
	var rowString = String.fromCharCode(48 + row);
	var col = cellId%9;
	var colLetter = String.fromCharCode(97 + col);
	
	if (directionIsNorthToSouth){
		return colLetter + rowString;
	}else{
		return rowString + colLetter;
	}
	

}
Game.prototype.pawnDirectionToVerboseNotation = function(direction){
	if (direction<0 ||direction >12){
		console.log("ASSERT ERROR: direction oustide limits...");
		return false;
	}
	return DIRECTIONS_VERBOSE[direction];
	
}


Game.prototype.playTurnByVerboseNotation = function( verboseNotation){
	
	if (this.gameStatus != PLAYING){
		
		console.log("game finished, restart to replay.  status: %d", this.gameStatus	);
		return false;
	}
	var undo_walls_1 = (JSON.parse(JSON.stringify(this.board.walls_1)));
	var undo_walls_2 = (JSON.parse(JSON.stringify(this.board.walls_2)));
	var undo_cells = cloneObject(this.board.cells);
	// clone(this.board.cells,undo_cells);
	
	//var undoBoard = this.board;
	//try if verbose notation is for moving the pawn, 
	//console.log("Move of player %d, move: %s", player, verboseNotation);
	var validMove = false;
	//console.log("-------------------------------------");
	if (verboseNotation == "x" || verboseNotation == "X"){
		console.log ("player %d gave up... (not implemented yet...) (%s)", this.playerAtMove, verboseNotation);
		validMove = false;
	}else if (this.movePawnByVerboseNotation(this.playerAtMove,verboseNotation)){
		console.log("player %d moved pawn (%s)", this.playerAtMove, verboseNotation);
		validMove= true;
	}else if (this.board.wallNotationToCellAndOrientation(verboseNotation)){
		this.placeWallByVerboseNotation(this.playerAtMove,verboseNotation);
		console.log("player %d placed wall (%s)", this.playerAtMove, verboseNotation);
		validMove = true;
	
	}else {
		console.log("wrong notation? invalid move? --> please correct this move: %s", verboseNotation);
		validMove = false;
	}
	
	if (!validMove){
		return false;
	}
	
	
	
	this.board.boardCellsToGraph(true);
	
	//console.log(this.board.boardGraph);
	//console.log(this.board.getShortestPathToFinish(this.playerAtMove));
	//console.log(undowalls_1);
	//console.log(this.board.cells);

	
	
	if (!this.board.isCurrentBoardLegal()){






		//clone(undo_cells,this.board.cells);
		//console.log(this.board.cells);
		console.log("undo movew");
		//console.log(this.board.walls_1);
		
		//this.outputBoard();
		this.undoLastWall(this.playerAtMove);
		
		
	}else{
		//check with administration
		this.playerAtMove =  (this.playerAtMove-1)*-1; //sets 0 to 1 and 1 to 0
		this.moveCounter++;
		this.recordingOfGameInProgress.push(verboseNotation);
		this.indicateActivePlayer();
		//console.log(this.recordingOfGameInProgress);
		this.outputGameStats();
	}
	/**/
	//check if there is a winner
	if (this.board.isThereAWinner()[0]){
		console.log("The winner of the game is player %d",this.board.isThereAWinner()[1]+1);
		this.gameStatus = FINISHED;
		//console.log(this.board.isThereAWinner());
		
	}else{
		//console.log("no winner");
		//console.log(this.board.isThereAWinner());
	}
	/**/
	
	//console.log(this.board);
	
	return true;
}



function cloneObject(obj) 
{
	//http://stackoverflow.com/questions/10151216/javascript-cloned-object-looses-its-prototype-functions
   obj = obj && obj instanceof Object ? obj : '';

   // Handle Date (return new Date object with old value)
   if (obj instanceof Date) {
     return new Date(obj); 
   }

   // Handle Array (return a full slice of the array)
   if (obj instanceof Array) {
     return obj.slice();
   }

   // Handle Object
   if (obj instanceof Object) {
     var copy = new obj.constructor();
     for (var attr in obj) {
         if (obj.hasOwnProperty(attr)){
             if (obj[attr] instanceof Object){
                 copy[attr] = cloneObject(obj[attr]);
             } else {
                 copy[attr] = obj[attr];
             }
         }
     }
     return copy;
   }

   throw new Error("Unable to copy obj! Its type isn't supported.");
}


function clone(destination, source) {
        for (var property in source) {
            if (typeof source[property] === "object" && source[property] !== null && destination[property]) { 
                clone(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
    };

Game.prototype.undoLastWall= function(player){
	//walls in game are the svg elements
	//walls in board contain the position and orientation
	//cells have the sides blocked.
	
	//1. get wall from board for the given player
	//2. set cell sides back to open
	//3. remove wall from board.walls_1 or 2
	this.board.removeLastWall(player); //step 1 and 2
	
	
	//4.set svg wall back in the garage.
	this.outputBoard();
	//5.update game administration.
	//do nothing for administration. we check first for legal move and do administration when all is good!
	//var walls = this.board.getWalls(); //[player]
	//console.log(player);
	//console.log(walls);
	//var playerWalls = walls[player];
	//var lastWall = playerWalls.pop();
	//
	//console.log(lastWall);
}

Game.prototype.outputGameStats= function(){
	
	if (this.playerAtMove == PLAYER1){
		document.getElementById('statsDiv').innerHTML = 'Blue Player playing.';
	}else{
		document.getElementById('statsDiv').innerHTML = 'Red Player playing.';
	}
	document.getElementById('statsDiv').innerHTML += '<br>Stats:';
	for (var i =0; i<this.recordingOfGameInProgress.length;i++){
		if (i%2 == 0){
			document.getElementById('statsDiv').innerHTML += ('<br>'+ (i+1) +'. ' + this.recordingOfGameInProgress[i]);		
		}else{
			document.getElementById('statsDiv').innerHTML += (' ' + this.recordingOfGameInProgress[i]);		
		}
	}
}

Game.prototype.placeWallByVerboseNotation = function(player, wallPosNotation){
	
	//console.log(wallPosNotation);
	
	//check if notation is correct.
	var isValidMove  = this.board.placeWallByVerboseCoordinate(player,wallPosNotation);
	this.outputWalls();
	return isValidMove;
	
}



Game.prototype.movePawnByVerboseNotation = function(player, verboseCoordinate ){
	
	var direction = this.pawnVerboseNotationToDirection(verboseCoordinate);
	var isValidMove = this.board.movePawn(player, direction,true); //simulate first
	
	
	if (!isValidMove){
		return false;
	}else{
		this.board.movePawn(player, direction,false); //actual move
		this.outputPawn(player);
		return true;
	}
	
	
}
	
Game.prototype.pawnVerboseNotationToDirection = function ( verboseCoordinate ){	
	//to lower case
	
	var verboseLowerCase = verboseCoordinate.toLowerCase();
	
	var direction = DIRECTIONS_VERBOSE.indexOf(verboseLowerCase);
	if (direction == -1){
		return false;
	}else{
		return direction;
	}
}

Game.prototype.outputBoard = function(){
	this.outputWalls();
	this.outputPawns();
}

Game.prototype.outputWalls = function(){
	var wallElements = [this.walls_1, this.walls_2];
	var allWalls = this.board.getWalls();
	
	
	/*
	
		
		
	}
	
	//top walls unused placement.
	for (var i=0; i<10;i++){
		this.walls_2.push(createLine(svgElement, 
			(WALL_START_DISTANCE_FROM_BOARD_X + i * WALL_START_DISTANCE_FROM_EACH_OTHER) * BOARD_SCALE    ,
			BOARD_Y_OFFSET_SCALED - WALL_START_DISTANCE_FROM_BOARD_Y,  
			(WALL_START_DISTANCE_FROM_BOARD_X + i * WALL_START_DISTANCE_FROM_EACH_OTHER) * BOARD_SCALE,
			BOARD_Y_OFFSET_SCALED - WALL_START_DISTANCE_FROM_BOARD_Y - WALL_LENGTH * BOARD_SCALE, 
			WALL_COLOR,
			WALL_WIDTH * BOARD_SCALE));	
	}
	*/
	
	
	
	
	
	
	
	
	
	
	
	for (var player=0;player<2;player++){
	//	console.log(allWalls[player].length);
		for (var wallIndex = 0; wallIndex < 10 ; wallIndex++){
			
			
			if (wallIndex > allWalls[player].length-1){
				//wall in garage (needs to be updated in case a wall was removed...)
				//console.log("ingarage");
				
				if (player == PLAYER1){
					
					// (   ,
					// 900*BOARD_SCALE + BOARD_Y_OFFSET_SCALED + WALL_START_DISTANCE_FROM_BOARD_Y,  
					// (WALL_START_DISTANCE_FROM_BOARD_X + i * WALL_START_DISTANCE_FROM_EACH_OTHER) * BOARD_SCALE,
					// 900*BOARD_SCALE + BOARD_Y_OFFSET_SCALED + WALL_START_DISTANCE_FROM_BOARD_Y + WALL_LENGTH * BOARD_SCALE, 
					// WALL_COLOR,
					// WALL_WIDTH * BOARD_SCALE));	
					//x1,y1,x2,y2
					wallElements[player][wallIndex].setAttribute("x1", (WALL_START_DISTANCE_FROM_BOARD_X + wallIndex * WALL_START_DISTANCE_FROM_EACH_OTHER) * BOARD_SCALE ) ;
					wallElements[player][wallIndex].setAttribute("x2",(WALL_START_DISTANCE_FROM_BOARD_X + wallIndex * WALL_START_DISTANCE_FROM_EACH_OTHER) * BOARD_SCALE) ;
					wallElements[player][wallIndex].setAttribute("y1", 900*BOARD_SCALE + BOARD_Y_OFFSET_SCALED + WALL_START_DISTANCE_FROM_BOARD_Y) ;
					wallElements[player][wallIndex].setAttribute("y2", 900*BOARD_SCALE + BOARD_Y_OFFSET_SCALED + WALL_START_DISTANCE_FROM_BOARD_Y + WALL_LENGTH * BOARD_SCALE) ;
				}else{
					wallElements[player][wallIndex].setAttribute("x1", (WALL_START_DISTANCE_FROM_BOARD_X + wallIndex * WALL_START_DISTANCE_FROM_EACH_OTHER) * BOARD_SCALE) ;
					wallElements[player][wallIndex].setAttribute("x2",(WALL_START_DISTANCE_FROM_BOARD_X + wallIndex * WALL_START_DISTANCE_FROM_EACH_OTHER) * BOARD_SCALE) ;
					wallElements[player][wallIndex].setAttribute("y1",BOARD_Y_OFFSET_SCALED - WALL_START_DISTANCE_FROM_BOARD_Y) ;
					wallElements[player][wallIndex].setAttribute("y2", BOARD_Y_OFFSET_SCALED - WALL_START_DISTANCE_FROM_BOARD_Y - WALL_LENGTH * BOARD_SCALE) ;
				}
				
			}else{
				//wall on board
				var wall = allWalls[player][wallIndex];
				//orientation in wall[2]
				
				
				if (wall[2]){
					//vertical walls
					// x = column [1]
					// y = row. [0]
					//orientation is [2]
					wallElements[player][wallIndex].setAttribute("x1", BOARD_SQUARE_SPACING * allWalls[player][wallIndex][1] * BOARD_SCALE + BOARD_X_OFFSET_SCALED) ;
					wallElements[player][wallIndex].setAttribute("x2", BOARD_SQUARE_SPACING * allWalls[player][wallIndex][1] * BOARD_SCALE + BOARD_X_OFFSET_SCALED) ;
					wallElements[player][wallIndex].setAttribute("y1", BOARD_SQUARE_SPACING * (allWalls[player][wallIndex][0] ) * BOARD_SCALE + BOARD_Y_OFFSET_SCALED - WALL_LENGTH/2 * BOARD_SCALE) ;
					wallElements[player][wallIndex].setAttribute("y2", BOARD_SQUARE_SPACING * (allWalls[player][wallIndex][0] )* BOARD_SCALE + BOARD_Y_OFFSET_SCALED +  WALL_LENGTH/2 * BOARD_SCALE) ;
				}else{
					wallElements[player][wallIndex].setAttribute("x1", BOARD_SQUARE_SPACING * (allWalls[player][wallIndex][1] ) * BOARD_SCALE + BOARD_X_OFFSET_SCALED - WALL_LENGTH/2 * BOARD_SCALE) ;
					wallElements[player][wallIndex].setAttribute("x2", BOARD_SQUARE_SPACING * (allWalls[player][wallIndex][1]) * BOARD_SCALE + BOARD_X_OFFSET_SCALED +  WALL_LENGTH/2 * BOARD_SCALE) ;
					wallElements[player][wallIndex].setAttribute("y1", BOARD_SQUARE_SPACING * allWalls[player][wallIndex][0] * BOARD_SCALE + BOARD_Y_OFFSET_SCALED) ;
					wallElements[player][wallIndex].setAttribute("y2", BOARD_SQUARE_SPACING * allWalls[player][wallIndex][0] * BOARD_SCALE + BOARD_Y_OFFSET_SCALED) ;
				}
			}
		}
	}	
}

Game.prototype.outputPawns = function(){
	this.outputPawn(PLAYER1);
	this.outputPawn(PLAYER2);
}
Game.prototype.outputPawn = function(player){
	var pawnCoords = (this.board.getPawnCoordinates(player));
	//console.log("player: %d : ", player);
	//console.log(pawnCoords);
	//svg 
	//var x,y;
	//x = parseInt(pawns[player].getAttribute("cx"));
	//y = parseInt(pawns[player].getAttribute("cy"));
	this.svgPawns[player].setAttribute("cx", (pawnCoords[1]+0.5) * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_X_OFFSET_SCALED);
	this.svgPawns[player].setAttribute("cy", (pawnCoords[0]+0.5) * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED);

	//console.log("x:%d", x);
	//console.log("efwefwewww");
}


Game.prototype.indicateActivePlayer = function(){
	var colours = [BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_1_ACTIVATED, BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_2_ACTIVATED];
	if (this.playerAtMove == PLAYER1){
		
		this.svgPawns[PLAYER1].setAttribute("fill",BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_1_ACTIVATED);
		this.svgPawns[PLAYER2].setAttribute("fill",BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_2);
	}else{
		this.svgPawns[PLAYER1].setAttribute("fill",BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_1	);
		this.svgPawns[PLAYER2].setAttribute("fill",BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_2_ACTIVATED);
	}
	
}

Game.prototype.mouseClickCellAsPawnCircleElement = function (callerElement){
	this.mouseCellAsPawnCircleElement(callerElement, true,true);
}
Game.prototype.mouseHoversInCellAsPawnCircleElement = function (callerElement){
	this.mouseCellAsPawnCircleElement(callerElement, true,false);
}
Game.prototype.mouseHoversOutCellAsPawnCircleElement = function (callerElement){
	this.mouseCellAsPawnCircleElement(callerElement, false,false);
}
	
Game.prototype.mouseCellAsPawnCircleElement = function (callerElement, isHoveringInElseOut, movePawnIfPossible){
	
	var colours = [ BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_1, BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_2];
		
	var id = callerElement.id;
	var cellId  = parseInt(id.substr(16,17));
	//console.log(cellId);
	
	if (!isHoveringInElseOut){
		//set color back to default value when hovering out. ALWAYS
		this.svgCellsAsPawnShapes[cellId].setAttribute('fill',BOARD_CELL_PAWNCIRCLE_COLOR_INACTIVE);
		return false;
	}
	
	//var colours = [BOARD_CELL_PAWNCIRCLE_COLOR_INACTIVE, BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_1, BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_2];
	//var neighboursPerDirection = this.board.getAllNeighBourCellIds(cellId);
	var neighboursPerDirection = this.board.getPawnAllNeighBourCellIds(this.playerAtMove);
		
	//check if cellId is one of the neighbours. 
	var directionOfNeighbour = neighboursPerDirection.indexOf(cellId);
	//console.log(directionOfNeighbour);
	if ( directionOfNeighbour == -1){ //http://webcache.googleusercontent.com/search?q=cache:fRIiu706MDoJ:stackoverflow.com/questions/1181575/determine-whether-an-array-contains-a-value+&cd=1&hl=en&ct=clnk&gl=ca
		//cellId is not one of the neighbours, so pawn can never move to this position...., exit without doing anything
		this.svgCellsAsPawnShapes[cellId].setAttribute('fill',BOARD_CELL_PAWNCIRCLE_COLOR_ILLEGAL_MOVE_HOVER);
		return false;
	}
	
	//check if move is possible
	var canPawnBeMovedHereForAllDirections = this.board.getValidPawnMoveDirections(this.playerAtMove);
	
	if (!canPawnBeMovedHereForAllDirections[directionOfNeighbour]){
		//console.log("moveIsNOTPOssible"); 
		//console.log("active player: %d ",this.playerAtMove);
		//pawn cant be moved
		//color forbidden movement.... on hover in
		this.svgCellsAsPawnShapes[cellId].setAttribute('fill',BOARD_CELL_PAWNCIRCLE_COLOR_ILLEGAL_MOVE_HOVER);
		return false;
	}
	
	//color move allowed at hover in
	this.svgCellsAsPawnShapes[cellId].setAttribute('fill',colours[this.playerAtMove]);
	
	if (movePawnIfPossible){
		//console.log(directionOfNeighbour);
		this.playTurnByVerboseNotation(this.pawnDirectionToVerboseNotation(directionOfNeighbour));
		//this.board.movePawn(PLAYER1, directionOfNeighbour, false);
		//this.outputPawns();
	}	
	return true;
}

Game.prototype.mouseClickPawnElement = function (callerElement){
	//this.mouseWallEvent(callerElement,true, true);
	this.mouseEventPawn(callerElement,true);
}
Game.prototype.mouseHoversInPawnElement = function (callerElement){
	//this.mouseWallEvent(callerElement,true, false);
	this.mouseEventPawn(callerElement,true);
}

Game.prototype.mouseHoversOutPawnElement = function (callerElement){
	//this.mouseWallEvent(callerElement, false, false);
	this.mouseEventPawn(callerElement,false);
}

Game.prototype.mouseEventPawn = function (callerElement,isHoveringInElseOut){
	var id = callerElement.id;
	var player  = parseInt(id.substr(12,13)) -1;
	if (player!= this.playerAtMove){
		//only show options for active player.		
		return false;
	}
	
	var colours = [BOARD_CELL_PAWNCIRCLE_COLOR_INACTIVE, BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_1, BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_2];
	
	var canPawnBeMovedHereForAllDirections = this.board.getValidPawnMoveDirections(player);
	var neighboursPerDirection = this.board.getPawnAllNeighBourCellIds(player);
	
	for (var i=0;i<canPawnBeMovedHereForAllDirections.length;i++){
		//for every direction that exists, we color the pawn circle in the correct cell.
		if (canPawnBeMovedHereForAllDirections[i]){
			//get cell id of active direction
			//id of player cell = 
			
			if (isHoveringInElseOut){
				this.svgCellsAsPawnShapes[neighboursPerDirection[i]].setAttribute('fill',colours[player + 1]);
			}else{
				this.svgCellsAsPawnShapes[neighboursPerDirection[i	]].setAttribute('fill',colours[0]);
				
				
			}
		}
	}
	
	
}

//wall lines mouse events
Game.prototype.mouseClickWallElement = function (callerElement){
	this.mouseWallEvent(callerElement,true, true);
}
Game.prototype.mouseHoversInWallElement = function (callerElement){
	this.mouseWallEvent(callerElement,true, false);
}

Game.prototype.mouseHoversOutWallElement = function (callerElement){
	this.mouseWallEvent(callerElement, false, false);
}



Game.prototype.mouseWallEvent = function (callerElement,isHoveringInElseOut,placeWallIfAllowed){
	var lineIndex= parseInt(callerElement.id);
	//console.log("hover: %d",parseInt(lineIndex));
	
	
	
	var colors = [[BOARD_LINE_HOVER_WALL_POSSIBLE_COLOR, BOARD_LINE_HOVER_WALL_NOT_POSSIBLE_COLOR],[BOARD_LINE_COLOR, BOARD_LINE_COLOR]];
	if (isHoveringInElseOut){
		isHoveringInElseOut = 0;
	}else{
		isHoveringInElseOut =1;
	}
	//assume horizontal
	var isNorthSouthOriented = false; 
	var startCellId = lineIndex;
	var neighbourCellId = startCellId +1;
	neighbourLineIndex = lineIndex +1;
	if (startCellId % 9 >= 8){
			neighbourCellId = 666;
	}
	
	if (lineIndex >= 72){
		//is vertical
		
		isNorthSouthOriented = true;
		startCellId = lineIndex - 72;
		neighbourCellId = startCellId + 9 ;
		neighbourLineIndex = neighbourCellId + 72;
		//console.log("startCellId : vertical %d", startCellId);
		if (startCellId > 71){
			//console.log("aaargh id= %d", startCellId);
			neighbourCellId = 666;
		}
	}
	
	if (placeWallIfAllowed){
		//this.board.placeWall(PLAYER1,startCellId, isNorthSouthOriented, false);
		//this.outputWalls();
		//console.log();
		if(this.board.placeWall (PLAYER1, startCellId, isNorthSouthOriented, true)){
			var verboseNotationWallPlacement = this.wallToVerboseNotation(startCellId, isNorthSouthOriented);
			this.playTurnByVerboseNotation(verboseNotationWallPlacement);
		}
		
	}else{	
		//colorize line
		if (this.board.isPositionAvailableForWallPlacement(startCellId, isNorthSouthOriented)){
			this.svgLineSegments[lineIndex].setAttribute('stroke',colors[isHoveringInElseOut][0]);
		}else{
			this.svgLineSegments[lineIndex].setAttribute('stroke',colors[isHoveringInElseOut][1]);
		}
		
		//colorize neighbour line if possible
		if (neighbourCellId != 666){
			if (this.board.isPositionAvailableForWallPlacement(startCellId, isNorthSouthOriented)){
				this.svgLineSegments[neighbourLineIndex].setAttribute('stroke',colors[isHoveringInElseOut][0]);
			}else{
				this.svgLineSegments[neighbourLineIndex].setAttribute('stroke',colors[isHoveringInElseOut][1]);
			}		
		}
	}

}

Game.prototype.buildUpBoard = function(svgElement){
	
	
	/*
	//add_circle(svgElement, x, y, r, id, color
	var circleTest = add_circle(svgElement, 0,50,50,"tmp", "blue");
	
	circleTest.addEventListener("click", function() { this.setAttribute('fill', 'red') });
	circleTest.addEventListener("mouseout", function() { this.setAttribute('fill', 'blue') });
*/
	//wall lines:
	//all line segements go in an array, their position index corresponds with their ID.
	//horizontal line segments: correspond with cell ID (with cell on the west)
	//vertical line segments, after subtracting by 72 (=number of horizontal line segments) correspond with cell ID(with cell on the north)
	
	
	var index = 0;
	//horizontal lines
	for (var i=0; i<8;i++){
		
		// x1, y1, x2, y2
		for (var j=0; j<9;j++){
			// createLine(svgElement, 0*BOARD_SCALE + BOARD_X_OFFSET_SCALED, i*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED , BOARD_SQUARE_SPACING*9*BOARD_SCALE + BOARD_X_OFFSET_SCALED, i*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, BOARD_LINE_COLOR, 10*BOARD_SCALE);	
			this.svgLineSegments.push(createLine(svgElement, 
			j * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_X_OFFSET_SCALED,
			(i+1) * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED ,
			(j+1) * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_X_OFFSET_SCALED, 
			(i+1)*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, 
			BOARD_LINE_COLOR, 10*BOARD_SCALE, index)	//BOARD_LINE_COLOR
			);
			//lines[lines.length-1].addEventListener("mouseover", function() { this.setAttribute('stroke', 'red') });
			//lines[lines.length-1].addEventListener("mouseout", function() { this.setAttribute('stroke', 'blue') });
			
			this.svgLineSegments[index].addEventListener("mouseover", function (){this.mouseHoversInWallElement(event.target);}.bind(this)); //works, sends back line#id
			this.svgLineSegments[index].addEventListener("mouseout", function (){this.mouseHoversOutWallElement(event.target);}.bind(this)); //works, sends back line#id
			this.svgLineSegments[index].addEventListener("click", function (){this.mouseClickWallElement(event.target);}.bind(this)); //works, sends back line#id
			index+= 1;
		}
	}
	
	//add vertical lines (cell sized)
	for (var i=0; i<9;i++){
		// x1, y1, x2, y2
		for (var j=0; j<9;j++){
			//j<8 is sufficient, but we use the id to link it to a cell, as this is also the index in the array, we want to keep things easier. (the other EAST vertical pieces are ON the board edge)
			
			// createLine(svgElement, 0*BOARD_SCALE + BOARD_X_OFFSET_SCALED, i*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED , BOARD_SQUARE_SPACING*9*BOARD_SCALE + BOARD_X_OFFSET_SCALED, i*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, BOARD_LINE_COLOR, 10*BOARD_SCALE);	
			this.svgLineSegments.push(createLine(svgElement, 
			(j+1) * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_X_OFFSET_SCALED,
			 i* BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED ,
			(j+1) * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_X_OFFSET_SCALED, 
			(i+1)*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, 
			BOARD_LINE_COLOR, 10*BOARD_SCALE, index)	//BOARD_LINE_COLOR
			);
			//lines[lines.length-1].addEventListener("mouseover", function() { this.setAttribute('stroke', 'red') });
			//lines[lines.length-1].addEventListener("mouseout", function() { this.setAttribute('stroke', 'blue') });
			
			this.svgLineSegments[index].addEventListener("mouseover", function (){this.mouseHoversInWallElement(event.target);}.bind(this)); //works, sends back line#id
			this.svgLineSegments[index].addEventListener("mouseout", function (){this.mouseHoversOutWallElement(event.target);}.bind(this)); //works, sends back line#id
			this.svgLineSegments[index].addEventListener("click", function (){this.mouseClickWallElement(event.target);}.bind(this)); //works, sends back line#id
			index+= 1;
		}
	}
	
	/**/
	//add top and bottom horizontal lines
	for (var i=0; i<2;i++){
		createLine(svgElement, 
		0*BOARD_SCALE + BOARD_X_OFFSET_SCALED, 
		(i*9)*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED , 
		BOARD_SQUARE_SPACING*9*BOARD_SCALE + BOARD_X_OFFSET_SCALED, 
		(i*9)*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, 
		BOARD_LINE_SIDE_COLOR, 10*BOARD_SCALE);	
	}
	//createLine(svgElement, x1, y1, x2, y2, color, width)
	
	
	
	//add left and right vertical lines
	for (var i=0; i<2;i++){
		createLine(svgElement, 
		(i*9)*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_X_OFFSET_SCALED ,
		0*BOARD_SCALE + BOARD_Y_OFFSET_SCALED,  
		(i*9)*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_X_OFFSET_SCALED, 
		BOARD_SQUARE_SPACING*9*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, 
		BOARD_LINE_SIDE_COLOR, 10*BOARD_SCALE);	
	}
	
	
	
	//add pawnPositions
	var index;
	for (var i=0; i<9;i++){ //rows
		// x1, y1, x2, y2
		for (var j=0; j<9;j++){ //cols
				index = (9*i) + j;
				this.svgCellsAsPawnShapes.push(add_circle(svgElement, (j+0.5) * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_X_OFFSET_SCALED  , (i+0.5) *BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, BOARD_PAWN_RADIUS *BOARD_SCALE, "cell_pawnCircle_" + index, BOARD_CELL_PAWNCIRCLE_COLOR_INACTIVE));
				this.svgCellsAsPawnShapes[index].addEventListener("click", function (){this.mouseClickCellAsPawnCircleElement(event.target);}.bind(this)); //works, sends back line#id
				this.svgCellsAsPawnShapes[index].addEventListener("mouseover", function (){this.mouseHoversInCellAsPawnCircleElement(event.target);}.bind(this)); //works, sends back line#id
				this.svgCellsAsPawnShapes[index].addEventListener("mouseout", function (){this.mouseHoversOutCellAsPawnCircleElement(event.target);}.bind(this)); //works, sends back line#id
		}
	}
	
	
	//players init --> set position to just somewhere on the board....
	//player 1
	//pawns.push(add_circle(svgElement, 450*BOARD_SCALE + BOARD_X_OFFSET_SCALED, 50*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, BOARD_PAWN_RADIUS *BOARD_SCALE, "pawn_player_1", BOARD_PAWN_1_COLOR));
	this.svgPawns.push(add_circle(svgElement, 365*BOARD_SCALE + BOARD_X_OFFSET_SCALED,35*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, BOARD_PAWN_RADIUS *BOARD_SCALE, "pawn_player_1", BOARD_PAWN_1_COLOR));
	
	
	//player 2
	//pawns.push( add_circle(svgElement, 450*BOARD_SCALE + BOARD_X_OFFSET_SCALED, 850*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, BOARD_PAWN_RADIUS *BOARD_SCALE, "pawn_player_2", BOARD_PAWN_2_COLOR));
	this.svgPawns.push( add_circle(svgElement, 666*BOARD_SCALE + BOARD_X_OFFSET_SCALED, 142*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, BOARD_PAWN_RADIUS *BOARD_SCALE, "pawn_player_2", BOARD_PAWN_2_COLOR));
	
	//add mouse events to player pawns
	for (var i = 0;i<2;i++){
		this.svgPawns[i].addEventListener("mouseover", function (){this.mouseHoversInPawnElement(event.target);}.bind(this)); //works, sends back line#id
		this.svgPawns[i].addEventListener("mouseout", function (){this.mouseHoversOutPawnElement(event.target);}.bind(this)); //works, sends back line#id
		//this.svgPawns[i].addEventListener("click", function (){this.mouseClickPawnElement(event.target);}.bind(this)); //works, sends back line#id
	}
	
	//bottom walls unused placement.
	for (var i=0; i<10;i++){
		this.walls_1.push(createLine(svgElement, 
			(WALL_START_DISTANCE_FROM_BOARD_X + i * WALL_START_DISTANCE_FROM_EACH_OTHER) * BOARD_SCALE    ,
			900*BOARD_SCALE + BOARD_Y_OFFSET_SCALED + WALL_START_DISTANCE_FROM_BOARD_Y,  
			(WALL_START_DISTANCE_FROM_BOARD_X + i * WALL_START_DISTANCE_FROM_EACH_OTHER) * BOARD_SCALE,
			900*BOARD_SCALE + BOARD_Y_OFFSET_SCALED + WALL_START_DISTANCE_FROM_BOARD_Y + WALL_LENGTH * BOARD_SCALE, 
			WALL_COLOR,
			WALL_WIDTH * BOARD_SCALE));	
		
	}
	
	//top walls unused placement.
	for (var i=0; i<10;i++){
		this.walls_2.push(createLine(svgElement, 
			(WALL_START_DISTANCE_FROM_BOARD_X + i * WALL_START_DISTANCE_FROM_EACH_OTHER) * BOARD_SCALE    ,
			BOARD_Y_OFFSET_SCALED - WALL_START_DISTANCE_FROM_BOARD_Y,  
			(WALL_START_DISTANCE_FROM_BOARD_X + i * WALL_START_DISTANCE_FROM_EACH_OTHER) * BOARD_SCALE,
			BOARD_Y_OFFSET_SCALED - WALL_START_DISTANCE_FROM_BOARD_Y - WALL_LENGTH * BOARD_SCALE, 
			WALL_COLOR,
			WALL_WIDTH * BOARD_SCALE));	
	}
}
Game.prototype.beep = function() {
    var snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
	snd.play();
}

Game.prototype.play_song = function(){
	//https://www.playonloop.com/2015-music-loops/cookie-island/
	if (SOUND_ENABLED_AT_STARTUP){
		var song = new Audio("POL-cookie-island-short.wav");
		song.play();
	}
}

function Board(){
	this.cells =[];
	this.walls_1 = []; //store walls;
	this.walls_2 = []; //store walls;
	
	this.init();
	this.boardGraph= {};
	this.boardCellsToGraph(true);
	this.shortestPathPerPlayer = [[]];
}

Board.prototype.isThereAWinner = function(){
	isPlayer1Winner = false;
	
	//check player 1 on winning cells?
	if (FINISH_CELLS_LOOKUP_TABLE[PLAYER1].indexOf(this.getPawnCellId(PLAYER1)) != -1){
		isPlayer1Winner = true;  //player1 won
		//console.log("tnpssem");
	}
	//check player2
	if (FINISH_CELLS_LOOKUP_TABLE[PLAYER2].indexOf(this.getPawnCellId(PLAYER2)) != -1 ){
		
		if (isPlayer1Winner){
			//return 2 winners error
			console.log("ASSERT ERROR: TWO WINNERS, BOTH PAWNS ON WINNING FIELD");
			return [false,666];
		}else{
			//return player 2 winner
			return [true,PLAYER2];
		}
	}else if (isPlayer1Winner){
		//return player 1 winner
		return [true,PLAYER1];
	}else{
		return [false,666];
	}
	//return no winners
	return [false,666];
}

Board.prototype.isCurrentBoardLegal = function (){
	//check if each player can reach a finish field.
	for(var player =0;player<2;player++){
		if (!this.getShortestPathToFinish(player)){
			console.log("illegal move!!");
			return false;
		}
	}
	return true;
}

Board.prototype.getShortestPathToFinish = function (player){
	//get cell with player.
	//var finishCellsLookupTable = [["0","1","2","3","4","5","6","7","8"],["72","73","74","75","76","77","78","79","80"]]; //valid finish cellIDs for player 1 and player 2
	//var finishCellsLookupTable = [[0,1,2,3,4,5,6,7,8],[72,73,74,75,76,77,78,79,80]]; //valid finish cellIDs for player 1 and player 2
	
	var playerCell = this.getPawnCellId(player);
	var searchGraph = new Graph(this.boardGraph);
	
	//console.log(graph.findShortestPath(4,80));	
	var shortestPath = [];
	//console.log("playerCell %d",playerCell);
//	console.log(finishCellsLookupTable[player][0]);
	
	var pathToFinish = [];
	//console.log(this.boardGraph);
	/**/
	for (var finishCell=0;finishCell<9;finishCell++){
		
		pathToFinish = searchGraph.findShortestPath(""+playerCell, ""+FINISH_CELLS_LOOKUP_TABLE[player][finishCell]);
		//console.log(pathToFinish);
		if (pathToFinish != null){
			if (pathToFinish.length < shortestPath.length || finishCell == 0){
				shortestPath = pathToFinish ;
				//console.log("poyeee");
			}
		}
		
		
	}
	if (pathToFinish == null){
		return false;
	}
	var shortestPathToInt=[];
	for (var i=0;i<shortestPath.length;i++){
		shortestPathToInt.push(parseInt(shortestPath[i]));
	}
	shortestPath = shortestPathToInt;
	this.shortestPathPerPlayer[player] = shortestPath;
	return shortestPath;
	
	/**/
	
	
	
	//console.log(searchGraph.findPaths(playerCell));
}
Board.prototype.boardCellsToGraph = function (weighted){
	
	//create graph with cellIds as vertexes and edges are accessible nieghbours.
	var graph = {};
	var extendedDirectionsLookUpTable= [[NORTHNORTH,NORTHEAST,NORTHWEST],[EASTEAST,NORTHEAST,SOUTHEAST],[SOUTHSOUTH,SOUTHEAST,SOUTHWEST],[WESTWEST,NORTHWEST,SOUTHWEST]]; 
	for (var cellId=0; cellId<this.cells.length;cellId++){
	//for (var cellId=0; cellId<3;cellId++){
		//check neighbours of the cell. not necessaraly physical neighbours, as pawns can jump.
		var neighbours= [];
		
		for (var direction = 0; direction <4;direction++){
			//check neighbours
			var neighbourId = this.cells[cellId].getNeighbourId(direction);
			//console.log("directiontest: %d ... %d", direction,neighbourId);
			
			//console.log(neighbourId);
			if (neighbourId>=0){
				
				var containsPawnIfSoWhichPlayer = this.cells[neighbourId].getIsOccupied();
				//console.log("pawn: %d ... ", containsPawnIfSoWhichPlayer);
				if (containsPawnIfSoWhichPlayer){
						//console.log("neighbourId");
						//console.log(neighbourId);
						//console.log(direction);
						
					//if neighbours contains the opposing pawn, "neighbouring cells" become jump cells
					//cell contains pawns, check all jump directions. i.e. n contains pawn--> ne, nn, nw.
					
					
					//first check straight jump
					if (this.movePawnStraightJump(cellId, extendedDirectionsLookUpTable[direction][0], true,true)){
						neighbours.push(this.cells[cellId].getNeighbourId(extendedDirectionsLookUpTable[direction][0]));
						
					}else {
						//check diagonal jump 
						for (var n=1;n<3;n++){
							//console.log (this.movePawnDiagonalJump(cellId,extendedDirectionsLookUpTable[direction][n],true,true));
							if (this.movePawnDiagonalJump(cellId,extendedDirectionsLookUpTable[direction][n],true,true)){
								neighbours.push(this.cells[cellId].getNeighbourId(extendedDirectionsLookUpTable[direction][n]));
							}
						}
						
					}
					
				}else{
					//player
					//console.log("direction:%d" ,direction);
					if (this.movePawnSingleCell(cellId, direction,true,true)){
						neighbours.push(this.cells[cellId].getNeighbourId(direction));
						
					};
					
				}
			}
				
			
			
		}
		//console.log(cellId);
		//console.log(neighbours);
		if (neighbours.length > 0){
			graph[cellId] = neighbours;
		}
	}
	
	if (weighted){
		var weightedGraph = {}
		for (var i = 0; i< Object.keys(graph).length; i++){
			
			var subgraph = {};
			if (i in graph){ //check if key exists.
				for(var j =0; j<graph[i].length; j++){
					subgraph[""+graph[i][j]]=1;
					
				}
				weightedGraph[""+i]=subgraph;
			}
			// console.log(subgraph);
		}
		//console.log("weightedGraph");
		//console.log(weightedGraph);
		this.boardGraph = weightedGraph;
	}else{
	
		this.boardGraph = graph;
	}
	//return graph;
}


Board.prototype.wallNotationToCellAndOrientation = function (verboseCoordinate){
	//returns startcellId and isNorthSouthOriented orientation as [id, orientation]
	//verboseCoordinate = string of two characters, one letters, one number. number from [1,8], letter [a,h]  i.e. b2 or 5C
	//verboseCoordinate :  i.e.   starting with a letter = vertical, starting with a number is horizontal. , letters and numbers indicate the wall lines on the board (between the cells), the crossing of the wall lines indicates the center point of the wall.
	//end result = four cells with each a direction.
	
	//get vertical wall line
	if (verboseCoordinate.length != 2){
		if (PRINT_ASSERT_ERRORS){
			console.log("ASSERT ERROR  not a wall move, notation should be two characters");
		}
		return false;
	}
	//var wallLines = verboseCoordinate.split('');
	var charVals = [verboseCoordinate.charCodeAt(0), verboseCoordinate.charCodeAt(1)];
	var isLetter =[];
	var values  = [];
	//convert chars to wall lines 
	//https://webserver2.tecgraf.puc-rio.br/cd/img/vectorfont_default.png
	for(var i=0;i<2;i++){
		if (charVals[i]>= 49 && charVals[i]<=56){
			//number
			isLetter[i] =false;
			values.push(charVals[i]-48);
		}else if (charVals[i]>= 65 && charVals[i]<=72){
			//capital
			isLetter[i] =true;
			values.push(charVals[i]-64);
		}else if (charVals[i]>= 97 && charVals[i]<=104){
			//small letter
			isLetter[i] =true;
			values.push(charVals[i]-96);
		}else{
			//assert error
			if (PRINT_ASSERT_ERRORS){
				console.log("ASSERT ERROR not a wall move, invalid character in notation to place a wall.");
			}
			return false;
		}
	}
	var isNorthSouthOriented = false;
	//check validity
	if (isLetter[0] == isLetter[1]){
		//check if both are number or letter
		if (PRINT_ASSERT_ERRORS){
			console.log("ASSERT ERROR: should be a letternumber or numberletter")
		}
		return false;
	}else if (isLetter[0]){
		isNorthSouthOriented = true;
		startCellCol = (values[0]-1);
		startCellRow = (8-values[1]);
	}else{
		isNorthSouthOriented = false;
		startCellRow = (8-values[0]);
		startCellCol = (values[1]-1);
	}
	
	return [this.rowColToCellId(startCellRow,startCellCol) , isNorthSouthOriented];
	//get startcell row and col
}







Board.prototype.getWallCenterPointWithOrientationFromStartCellIdAndOrientation = function(startCellId, orientation){
	//wall = [ horizontalLine, verticalLine, isOrientationNorthSouth]
	//console.log(startCellId);
	var rowCol = this.cells[startCellId].getRowColFromId();
	return [rowCol[0]+1 , rowCol[1]+1, orientation];
}
Board.prototype.getStartCellIdAndOrientationFromWallCenterPointWithOrientation = function(row, col, orientation){
	//wall = [ horizontalLine, verticalLine, isOrientationNorthSouth]
	//console.log(startCellId);
	var startCellId = (row-1)*9 + (col-1);
	return [startCellId, orientation];
}
Board.prototype.getWalls = function (){
	return [this.walls_1 , this.walls_2];
}

Board.prototype.getWallsCombined = function (){
	//all walls together
	return this.walls_1.concat(this.walls_2);
}


Board.prototype.isCenterPointAvailableForWallPlacement = function(startCellId, orientation){
	//check if centerpoint is already occupied.
	var wallCenterPointAndOrientation = this.getWallCenterPointWithOrientationFromStartCellIdAndOrientation(startCellId, orientation);
	//console.log(wallCenterPointAndOrientation);
	var walls = this.getWallsCombined();
	var positionIsAvailable = true
	//console.log(walls);
	for (var i=0;i<walls.length;i++){	
		
		if (walls[i][0] == wallCenterPointAndOrientation[0] && walls[i][1] == wallCenterPointAndOrientation[1]){
			positionIsAvailable=false;
			return positionIsAvailable;
		}
	}
	return positionIsAvailable;
}

Board.prototype.isPositionAvailableForWallPlacement = function(startCellId, isNorthSouthOriented){
	
	return this.placeWall(PLAYER1,startCellId, isNorthSouthOriented, true);
}

Board.prototype.isWallPositionAvailableByVerboseCoordinate= function (player,verboseCoordinate){
	var wallCoords = this.wallNotationToCellAndOrientation(verboseCoordinate);
	if(!wallCoords){
		//notation unvalid
		return false;
	}
	return this.placeWall(player, wallCoords[0],wallCoords[1],true );
}

Board.prototype.placeWallByVerboseCoordinate= function (player,verboseCoordinate){
	var wallCoords = this.wallNotationToCellAndOrientation(verboseCoordinate);
	if(!wallCoords){
		//notation unvalid
		return false;
	}
	return this.placeWall(player, wallCoords[0],wallCoords[1],false );
}
Board.prototype.removeLastWall = function(player){
	var lastWall = this.getWalls()[player].pop();//remove last wall fromlist.
	// console.log(lastWall);
	var lastWallCoords = this.getStartCellIdAndOrientationFromWallCenterPointWithOrientation(lastWall[0],lastWall[1],lastWall[2]);
	
	var lastWallStartCellId = lastWallCoords[0];
	var lastWallOrientationIsNorthSouth = lastWallCoords[1];
	
	var startCell = this.cells[lastWallStartCellId];
	var neighEastId = startCell.getNeighbourId(EAST);
	var neighSouthId = startCell.getNeighbourId(SOUTH);
	var neighSouthEastId = startCell.getNeighbourId(SOUTHEAST);
	// console.log(lastWallCoords[0]);
	// console.log(neighEastId);
	// console.log(neighSouthId);
	// console.log(neighSouthEastId);
	var allInvolvedCellsIds = [lastWallStartCellId, neighEastId, neighSouthEastId, neighSouthId];
	//--> pattern for 4 cells: startcell, then east, then southeast, then south
	var sidesForNorthSouthOrientation = [EAST,WEST,WEST,EAST];
	var sidesForEastWestOrientation = [SOUTH,SOUTH,NORTH,NORTH];
	
	//decide which sides are affected.
	var sidesToChange = sidesForEastWestOrientation; ////assume east west oriented
	if (lastWallOrientationIsNorthSouth){
		sidesToChange = sidesForNorthSouthOrientation;//north south oriented
	}
	//console.log(lastWallCoords);
	//remove Wall from cells.
	for (var i=0;i<4;i++){
		this.cells[allInvolvedCellsIds[i]].openSide(sidesToChange[i]) ;
	}
}

Board.prototype.placeWall = function (player, startCellId, isNorthSouthOriented, onlyCheckAvailabilityDontPlaceWall){
	//wall covers always two cells, 
	//if east west oriented: at South of startcell, and eastern neighbour cell
	// if north east : at East o fstartcell, and southern neighbour cell
	
	var startCell = this.cells[startCellId];
	
	//check if within board limits:
	if (!(startCell.row >=0 && startCell.row<=7 && startCell.col >=0 && startCell.col<=7)){
		if (!onlyCheckAvailabilityDontPlaceWall){
			console.log("ASSER ERROR WRONG CELL as wall start identifier ");
			console.log("-------------------------");
			console.log(startCell);
		}	
		return false;
	}
	
	//first check if centerpoint is available
	if (!this.isCenterPointAvailableForWallPlacement(startCellId, isNorthSouthOriented)){
		if (!onlyCheckAvailabilityDontPlaceWall){
			console.log("centerpoint wall occupied. wall cannot be placed.");
		}
		
		return false;
	}	
	
	//check borders in cells.
	//assume neighbours existing.
	//for (var i=0; i<4;i++){
	
	var neighEastId = startCell.getNeighbourId(EAST);
	var neighSouthId = startCell.getNeighbourId(SOUTH);
	var neighSouthEastId = startCell.getNeighbourId(SOUTHEAST);
	
	
	var allInvolvedCellsIds = [startCellId, neighEastId, neighSouthEastId, neighSouthId];
	//--> pattern for 4 cells: startcell, then east, then southeast, then south
	var sidesForNorthSouthOrientation = [EAST,WEST,WEST,EAST];
	var sidesForEastWestOrientation = [SOUTH,SOUTH,NORTH,NORTH];
	
	//decide which sides are affected.
	var sidesToChange = sidesForEastWestOrientation;
	if (isNorthSouthOriented){
		sidesToChange = sidesForNorthSouthOrientation;
	}
	
	var isAllAffectedSideOpen = true;
	
	//console.log(allInvolvedCellsIds);
	//console.log(sidesToChange);
	//check if sides are already occupied.
	for (var i=0;i<4;i++){
		//console.log(this.cells[allInvolvedCellsIds[i]].isSideOpen(sidesToChange[i]));
		if( !this.cells[allInvolvedCellsIds[i]].isSideOpen(sidesToChange[i])){
			isAllAffectedSideOpen=false;
		}
	}
	if (!isAllAffectedSideOpen){
		//wall cannot be placed because another wall is blocking its path somewhere.
		if (!onlyCheckAvailabilityDontPlaceWall){
			console.log("position not valid for wall placement");
		} 
		return false;
	}
	
	
	//check completed, return results if only simulation.
	if (onlyCheckAvailabilityDontPlaceWall){
		return true;
	}
	
	//place wall
	for (var i=0;i<4;i++){
		this.cells[allInvolvedCellsIds[i]].closeSide(sidesToChange[i]) ;
	}
	
	
	//store wall as wall (cells is not enough, we have to know the exact wall, for the gaps...)
	if (player == PLAYER1){
		this.walls_1.push(this.getWallCenterPointWithOrientationFromStartCellIdAndOrientation(startCellId, isNorthSouthOriented));
		
	}else{
		this.walls_2.push(this.getWallCenterPointWithOrientationFromStartCellIdAndOrientation(startCellId, isNorthSouthOriented));
		
	}
	return true;
	
}

Board.prototype.init = function (){
	var id=0;
	
	//cell numbering:
	//  0,0 ---> + col
	//  |
	//  |
	//  V +row
	
	//indication of sides and "wall" lines. Hx = horizontal, Vx= vertical, (x,x) =cell
	//    H0        H0
	//V0  (0,0)  V1  (0,1) V2  (0,2)  ....
	//    H1        H1 
	//V0  (1,0)  V1  (1,1) V2  (1,2)   ....
	//    H1        H1   ....
	//   ....      .... 
	for (var row=0; row<9;row++){
		for (var col=0; col<9;col++){
			
			this.cells.push(new Cell(row,col, row>0, col<8, row<8, col>0 ));
			//this.cells[this.cells.length - 1].printToConsole();
			//console.log(row);
		}
	}
	//define cells with pawns.
	this.pawnCellsIds = [this.rowColToCellId(8,4), this.rowColToCellId(0,4)];
	this.cells[this.pawnCellsIds[PLAYER1]].acquirePawn(PLAYER1);
	this.cells[this.pawnCellsIds[PLAYER2]].acquirePawn(PLAYER2);
	
	
};



Board.prototype.getAllNeighBourCellIds= function(cellId){
	var activeCell = this.cells[cellId];
	var neighbourIds = [];
	for (var i=0;i<12;i++){
		//for every direction that exists, we color the pawn circle in the correct cell.
		//get cell id of active direction
		//id of player cell = 
		neighbourIds.push(activeCell.getNeighbourId(i));
	}
	return neighbourIds;
}

Board.prototype.getPawnAllNeighBourCellIds= function(player){
	
	//for the 12 directions.
	var cellId = this.pawnCellsIds[player];
	return this.getAllNeighBourCellIds(cellId);
	
}

Board.prototype.getValidPawnMoveDirections = function(player){
	var validDirections = []
	for (var i =0;i<12;i++){
		validDirections.push(this.movePawn(player,i,true));
	}
	return validDirections;
}

Board.prototype.movePawn = function(player, direction,isSimulation){
	var isValidMove;
	if (direction< 4){
		isValidMove = this.movePawnSingleCell(player, direction,isSimulation,false);
		
	}else if (direction <8){
		isValidMove =  this.movePawnDiagonalJump(player, direction,isSimulation,false);
		
	}else if (direction <12){
		isValidMove = this.movePawnStraightJump(player, direction,isSimulation,false);
		 
	}else{
		if (!isSimulation){
			console.log("ASSERT ERROR: non valid pawn move direction");
		};
		isValidMove = false;
	}
	
	return isValidMove;
	
}

Board.prototype.movePawnStraightJump = function(player, twoStepsDirection, isSimulation, playerContainsStartCellIdInsteadOfPlayer){
	//player is the jumping player.
	//twostepsdirection nn,ee,ss,ww
	//isSimulation-> does not output console log.
	
	
	if (playerContainsStartCellIdInsteadOfPlayer){
		var cell = this.cells[player];
	}else{
		var cell = this.cells[this.pawnCellsIds[player]];
	}
	
	singleStepDirection = twoStepsDirection-8;
	//check if neighbour cell exists
	if (!cell.isThereAnExistingNeighbourOnThisSide(twoStepsDirection)){
		if (!isSimulation){
			console.log("ASSERT ERROR: no neighbour cell existing");
		}
		return false;
	}
	
	//get the two neighbour ids.
	var neighbourId = cell.getNeighbourId(singleStepDirection);
	var twoNeighbourdIds = cell.getNeighbourId(twoStepsDirection);
	// console.log(this.pawnCellsIds[player]);
	// console.log(neighbourId);
	// console.log(twoNeighbourdIds);
	
	//check if direction not blocked by wall
	if (!cell.isSideOpen(singleStepDirection) || !this.cells[neighbourId].isSideOpen(singleStepDirection)){
		if (!isSimulation){
			console.log("one or two walls in the way, can't jump in direction %d (N=0, E=1, S=2, W=3)", singleStepDirection);
		}
		return false;
	}
	
	//check if neighbour has pawn
	if (!this.cells[neighbourId].getIsOccupied()){
		if (!isSimulation){
			console.log("Can only jump if neighbour has a pawn");
		}
		return false
	}
	
	
	
	// console.log(this.pawnCellsIds[player]);
	// console.log(neighbourId);
	//console.log(twoNeighbourdIds);
	
	if (!isSimulation){
		//make the move
		cell.releasePawn(player); //release pawn for current cell
		
		this.pawnCellsIds[player] = twoNeighbourdIds; 
		
		this.cells[this.pawnCellsIds[player]].acquirePawn(player);//acquire pawn
	}
	
	return true;
	
}

Board.prototype.movePawnDiagonalJump = function(player, diagonalDirection, isSimulation,playerContainsStartCellIdInsteadOfPlayer){
	//check if neighbour cell exists
	
	if (playerContainsStartCellIdInsteadOfPlayer){
		var cell = this.cells[player];
	}else{
		var cell = this.cells[this.pawnCellsIds[player]];
	}
	
	if (!cell.isThereAnExistingNeighbourOnThisSide(diagonalDirection)){
		//this works, if both orthogonals existing, diagonal is existing too
		if(!isSimulation){
			console.log("ASSERT ERROR: no neighbour cell existing");
		}
		return false;
	}
	
	lookupTable = [[NORTH,EAST],[SOUTH,EAST],[SOUTH,WEST],[NORTH,WEST]] ; //ne, se,sw,nw
	
	//neighbour id can be one of both, i.e. to go NE --> we can go first east then north, or first north than east.... --> the neighbour having the opponent pawn is the neighbour 
	var neighbourId = cell.getNeighbourId(lookupTable[diagonalDirection - 4][0]); //assume one direction for neighbour
	var firstDirection = lookupTable[diagonalDirection - 4][0];
	var secondDirection = lookupTable[diagonalDirection - 4][1];
	
	//console.log(neighbourId);
	//console.log(neighbourId);
	//console.log(this.cells[neighbourId].getIsOccupied());
	if (!this.cells[neighbourId].getIsOccupied()){  //...if not containing neighbour, assume other direction for neighbour
		//console.log("other neighbour");
		neighbourId = cell.getNeighbourId(lookupTable[diagonalDirection - 4][1]); //... assume the other neighbour. the real check for the correct pawn follows later...
		firstDirection = lookupTable[diagonalDirection - 4][1];
		secondDirection = lookupTable[diagonalDirection - 4][0];
	}
	
	//check neighbour containing pawn
	if (!this.cells[neighbourId].getIsOccupied()){
		//console.log (this.cells[neighbourId].getIsOccupied() == player+1);
		if(!isSimulation){
			console.log ("no pawn detected at adjecent cell, no jump allowed.");
		}
		return false;
	}
	
	//check neighbour containing other pawn
	if (!playerContainsStartCellIdInsteadOfPlayer && this.cells[neighbourId].getIsOccupied() == player+1 ){
		
		//console.log (this.cells[neighbourId].getIsOccupied() == player+1);
		if(!isSimulation){
			console.log ("no opposite player pawn detected at adjecent cell, no jump allowed.");
		}
		return false;
	}
	
	//get the second  neighbour id
	var twoNeighbourdIds = this.cells[neighbourId].getNeighbourId(secondDirection);
//	console.log("diagtest:");
//	console.log(diagonalDirection);
//	console.log(this.pawnCellsIds[player]);
//	console.log(neighbourId);
//	console.log(twoNeighbourdIds);
	
	
	//check wall blocking move from cell to neighbour
	if (!cell.isSideOpen(firstDirection)){
		if(!isSimulation){
			console.log ("no diagonal jump allowed, not possible to move to reach neighbour cell");
		}
		return false;
	}
	
	//check wall blocking straight jump from neighbour to second neighbour
	if (this.cells[neighbourId].isSideOpen(firstDirection)){
		if(!isSimulation){
			console.log ("no diagonal jump allowed, the forward side has to be blocked, otherwise it would be a straight jump");
		}
		return false;
	}
		
	//check wall blocking diag jump from neighbour to second neighbour
	if (!this.cells[neighbourId].isSideOpen(secondDirection)){
		if(!isSimulation){
			console.log ("no diagonal jump allowed, a side ways side is preventing the jump.");
		}	
		return false;
	}
	
	
	if (!isSimulation){
		//do actual move.
		//make the move
		cell.releasePawn(player); //release pawn for current cell
		
		this.pawnCellsIds[player] = twoNeighbourdIds; 
		
		this.cells[this.pawnCellsIds[player]].acquirePawn(player);//acquire pawn
	}
	return true;
	
}

Board.prototype.movePawnSingleCell = function(player, direction, isSimulation,playerContainsStartCellIdInsteadOfPlayer){
	//check if neighbour cell exists
	
	
	
	//check for walls, sides and other pawn, notify event "win" 
	
	//side check
	//check if neighbour cell exists 
	if (playerContainsStartCellIdInsteadOfPlayer){
		var cell = this.cells[player];
	}else{
		var cell = this.cells[this.pawnCellsIds[player]];
	}
	if (!cell.isThereAnExistingNeighbourOnThisSide(direction)){
		if(!isSimulation){
			console.log("ASSERT ERROR: no neighbour cell existing");
		}
		return false;
	}
	
	//check if direction not blocked by wall
	if (!cell.isSideOpen(direction)){
		if(!isSimulation){
			console.log("wall in the way, can't move in direction %d (N=0, E=1, S=2, W=3)", direction);
		}
		
		return false;
	}
	
	//check if direction not blocked by other pawn
	var neighbour = cell.getNeighbourId(direction); //get neighbour id
	
	if (this.cells[neighbour].getIsOccupied()){
		if (!isSimulation){
			console.log("cant move, destination cell contains other pawn. Please perform a jump move.");
		}
		return false
	}
	
	if (!isSimulation){
		//make the move
		cell.releasePawn(player); //release pawn
		this.pawnCellsIds[player] = neighbour;
		cell = this.cells[this.pawnCellsIds[player]];
		cell.acquirePawn(player);//acquire pawn
	}
	return true;
	
}



Board.prototype.rowColToCellId = function(row,col){
	//cell id is cell index in this.cells
	return row*9+col;
}


Board.prototype.getPawnCellId = function(player){
	if (player == PLAYER1 || player == PLAYER2){
		return this.pawnCellsIds[player];
	}else{
		console.log("ASSERT ERROR NO VALID PLAYER");
		return -666;
	}
}

Board.prototype.getPawnCoordinates = function(player){
	//console.log("playercell: %d ", this.pawnCellsIds[player]);
	return  this.cells[this.pawnCellsIds[player]].getRowColFromId();
}



// function Cell (bool wallNorth, bool wallEast, bool wallSouth, bool wallWest, bool pawnPlayerA, bool pawnPlayerB){
function Cell (row, col, openToNorth, openToEast, openToSouth, openToWest){
	this.row = row;
	this.col = col;
	this.id = 9*row + col; //i.e. id 10  = cell 
	this.position = [row,col];
	this.openSides = [openToNorth, openToEast, openToSouth, openToWest]; //will change during the game
	this.sideHasExistingNeighbourCell = [openToNorth, openToEast, openToSouth, openToWest]; //never change this
	this.occupiedByPawn = 0;
	
	//console.log(this.row);
	
}


Cell.prototype.getId = function(){
	return this.id;
}
Cell.prototype.getRowColFromId = function(){
	return [parseInt(this.id/9), this.id%9];
}

Cell.prototype.getIsOccupied = function(){
	return this.occupiedByPawn ;
};
Cell.prototype.printToConsole = function(){
	console.log('----- row: %d -- col: %d -------',this.row, this.col);
	console.log(this.occupiedByPawn);
	console.log (this.openSides);
	
	
}
Cell.prototype.isSideOpen = function(direction){
	//direction: 0 is North, 1 E, 2S, 3 West
	
	return this.openSides[direction];
}

Cell.prototype.isThereAnExistingNeighbourOnThisSide = function(direction){
	//direction: 0 is North, 1 E, 2S, 3 West
	////4NE, 5SE, 6, SW, 7 NW
	
	var directionsToCheckForDiagonals_lookUpTable = [ [0,1],[1,2],[2,3],[3,0]];
	
	if (direction<4){
	
		return this.sideHasExistingNeighbourCell[direction];
	}else if (direction <8){
		//both diag neighbours have to exist to return true.
		return this.sideHasExistingNeighbourCell[directionsToCheckForDiagonals_lookUpTable [direction-4][0] ] &&
			   this.sideHasExistingNeighbourCell[directionsToCheckForDiagonals_lookUpTable [direction-4][1] ];
	}else if (direction < 12){
			return this.isThereAnExistingNeighbourOnThisSide(direction - 8);
	}else{
		//if (PRINT_ASSERT_ERRORS){
		console.log("ASSERT ERROR DIRECITON NOT EXISTING");
		//}
		return 666;
	}
}
Cell.prototype.closeSide = function(direction){
	//direction: 0 is North, 1 E, 2S, 3 West
	this.openSides[direction] = false;
}
Cell.prototype.openSide = function(direction){
	//direction: 0 is North, 1 E, 2S, 3 West
	this.openSides[direction] = true;
}
Cell.prototype.acquirePawn= function(player){
	if(this.occupiedByPawn >0){
		//if (PRINT_ASSERT_ERRORS){
			console.log("ASSERT ERROR: cell already contains pawn");
		//}
		return false;
	}else{
		this.occupiedByPawn = player+1;
		return true;
	}
}
Cell.prototype.releasePawn =function(player){
	if(this.occupiedByPawn <1){
		//if (PRINT_ASSERT_ERRORS){
			console.log("ASSERT ERROR: cell does not contain pawn");
		//}
		return false;
	}else{
		this.occupiedByPawn = 0;
		return true;
	}
}

Cell.prototype.getNeighbourId= function (direction){
	//direction: 0 is North, 1 E, 2S, 3 West
	//4NE, 5SE, 6, SW, 7 NW , 8NN, 9 EE, 10 SS, 11, WW
	if (!this.isThereAnExistingNeighbourOnThisSide(direction)){
		if(PRINT_ASSERT_ERRORS){
			console.log("ASSERT ERROR neighbour not existing");
		}
		return -666;
	}
	//assert neighbour is existing. 
	switch (direction){
		case NORTH:
			//north
			return this.id -9;
			break;	
		case EAST:
			//east
			return this.id+1;
			break;
		case SOUTH: //s
			return this.id+9;
			break;
		case WEST://w
			return this.id-1;
			break;
		case NORTHEAST: //ne
			return this.id-8;
			break;
		case SOUTHEAST: //se
			return this.id+10;
			break;
		case SOUTHWEST: //sw
			return this.id+8;
			break;
		case NORTHWEST: //nw
			return this.id-10;
			break;
		case NORTHNORTH:
			return this.id - 18;
			break;
		case EASTEAST:
			return this.id +2;
			break;
		case SOUTHSOUTH:
			return this.id +18;
			break;
		case WESTWEST:
			return this.id -2;
			break;
			
		
	}
}

