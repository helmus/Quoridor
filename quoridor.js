 //docReady(function() { 
	// initQuoridorDOM();
	

// });
//http://www.javascripter.net/faq/colornam.htm

var SOUND_ENABLED_AT_STARTUP = true;
var BOARD_ROTATION_90DEGREES = false;
var PRINT_ASSERT_ERRORS = false;
var GAME_REPLAY_TIME_BETWEEN_MOVES_MILLIS = 700;


var BOARD_WIDTH = 1000;
var BOARD_HEIGHT = 1500;
var BOARD_SCALE = 0.4;
var BOARD_X_OFFSET = 50;
var BOARD_Y_OFFSET = 300;
var BOARD_X_OFFSET_SCALED = BOARD_X_OFFSET * BOARD_SCALE;
var BOARD_Y_OFFSET_SCALED = BOARD_Y_OFFSET * BOARD_SCALE;
var BOARD_BACKGROUND_COLOR = "palegreen" ;

var BOARD_TEXT_NOTATION_SIZE = 40;
var BOARD_TEXT_NOTATION_COLOR = "black";
var BOARD_TEXT_NOTATION_ENABLED = true;

var BOARD_SQUARE_SPACING = 100;
var BOARD_LINE_COLOR = "white";
var BOARD_LINE_HOVER_WALL_POSSIBLE_COLOR = "grey";
var BOARD_LINE_HOVER_WALL_NOT_POSSIBLE_COLOR = "red";
var BOARD_LINE_WIDTH = 15;
var BOARD_LINE_SIDE_COLOR = "grey";

var BOARD_PAWN_RADIUS = 35;
var BOARD_PAWN_1_COLOR = "lightskyblue";
var BOARD_PAWN_2_COLOR = "lightsalmon";

var BOARD_CELL_PAWNCIRCLE_COLOR_ILLEGAL_MOVE_HOVER = BOARD_BACKGROUND_COLOR ; //"red" //"white";
var BOARD_CELL_PAWNCIRCLE_COLOR_INACTIVE = BOARD_BACKGROUND_COLOR;
var BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_1 = "paleturquoise";
var BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_1_ACTIVATED = "paleturquoise"; //"deepskyblue";
var BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_2 = "peachpuff";
var BOARD_CELL_PAWNCIRCLE_COLOR_PLAYER_2_ACTIVATED  = "peachpuff"; //"salmon";
var BOARD_CELL_PAWNCIRCLE_FINISH_COLOR_PLAYER_2= BOARD_BACKGROUND_COLOR; //BOARD_PAWN_2_COLOR   //this is the highlighting of the finish locations
var BOARD_CELL_PAWNCIRCLE_FINISH_COLOR_PLAYER_1= BOARD_BACKGROUND_COLOR; //BOARD_PAWN_1_COLOR //this is the highlighting of the finish locations
var BOARD_CELL_PAWNCIRCLE_FINISH_COLOR_PLAYER_TRANSPARENCY = 0.4;
var BOARD_CELL_PAWNCIRCLE_COLOR_SHORTEST_PATH_INDICATION = BOARD_BACKGROUND_COLOR; //"white";
var BOARD_CELL_PAWNCIRCLE_COLOR_SHORTEST_PATH_INDICATION_TRANSPARENCY = 0.3;
var BOARD_CELL_PAWNCIRCLE_COLOR_INACTIVE_TRANSPARENCY = 1; //http://stackoverflow.com/questions/6042550/svg-fill-color-transparency-alpha
var BOARD_CELL_PAWNCIRCLE_BORDER_COLOR = "grey"; //"teal";
var BOARD_CELL_PAWNCIRCLE_BORDER_WIDTH = 2;

var NOTATION_ENABLED_AT_STARTUP = true;
var WALL_START_DISTANCE_FROM_BOARD_X = 80;
var WALL_START_DISTANCE_FROM_BOARD_Y = 20	;
var WALL_START_DISTANCE_FROM_EACH_OTHER = 93;
var WALL_WIDTH = 15;//14;
var WALL_LENGTH = 2*BOARD_SQUARE_SPACING - WALL_WIDTH-10;
var WALL_COLOR = "teal"; //"steelblue";

//symbols
var DIRECTIONS_VERBOSE = ["n","e","s","w","ne","se","sw","nw","nn","ee","ss","ww"];
//var COUNTER_MOVES_FOR_UNDO = [];
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


var PLAYER_NAMES = ["Blue" , "Red" ];

var BUTTON_STATS_MOVE_WIDTH_PIXELS = "40px";

//game status
var SETUP =0;
var PLAYING=1;
var FINISHED=2;
var MULTIPLAYER_PLAYING = 3;
var REPLAY = 4;

var FINISH_CELLS_LOOKUP_TABLE = [[0,1,2,3,4,5,6,7,8],[72,73,74,75,76,77,78,79,80]]; //valid finish cellIDs for player 1 and player 2

var WALL_MOVE = 0;
var PAWN_MOVE = 1;
var GAVEUP_MOVE = 2;
var ILLEGAL_MOVE = 3;




document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    alert(charStr);
};





document.addEventListener("DOMContentLoaded", function() {

	// var divTest = document.getElementById("test");
	//addTextWithClick(divTest, "yow<br>yeee" ,"namelode", "bla", test, "ijiee" );
	// test("ijij");
	
	var quoridorManager = new Manager();
	//quoridorManager.loadAndContinueGame();
	
});

function Manager(){
	this.domElements  = initQuoridorDOM();
	// this.startNewGame();
	this.multiPlayerDiv = this.domElements["multiplayerDiv"];
	
	//addButtonToExecuteGeneralFunction(this.multiPlayerDiv,"Submit Move","submitToServer", "submitToServer", this.submitMove,this);
}

Manager.prototype.submitMove = function (instance){	
	// alert("submit move (todo)");
}


Manager.prototype.loadAndContinueGame = function (){	
	var qGame = new Game(this.domElements["board"],  this.domElements ["stats"] );
	
	qGame.multiplayerLoadBoard("n,s,n,s");
}

Manager.prototype.loadAndContinueLocalGame = function (gameString){	
	var qGame = new Game(this.domElements["board"],  this.domElements ["stats"] );
	qGame.loadBoard(gameString);
}

Manager.prototype.startNewGame = function (){
	this.localGame = new Game(this.domElements["board"],  this.domElements ["stats"] );
}

Manager.prototype.restartGame = function (){
	this.localGame.eraseBoard();	
}
Manager.prototype.stopAndDeleteGame = function (){
	this.localGame.deleteGame();	
}
// Manager.prototype.replayGameString = function (gameString){
	// this.startNewGame();
	// this.replayGame = new GameReplay (this.localGame, gameString);
	
// }



function initQuoridorDOM(){
	var quoridorField = document.getElementById("board");
	//console.log(quoridorField);
	//addDiv(setShowField, "card");
	var statsDiv = document.getElementById("options");
	
	//addButtonToExecuteGeneralFunction(statsDiv,"Display Notation","displayNotation", "displayNotation", this.displayNotation,this);
	//<button type="button" onclick="toggleNotation()" class="btn btn-primary">Display notation</button>
	
	var multiplayerDiv = document.getElementById("multiPlayerControls");
	if (BOARD_ROTATION_90DEGREES){
		field.setAttribute("transform", "rotate(90)");
	}
	
	//var notationEnabled = NOTATION_ENABLED_AT_STARTUP;
	
	//recordedGame = [EAST];
	moveCounter = 0;
	//window.setTimeout(callback(PLAYER1, EAST),GAME_REPLAY_TIME_BETWEEN_MOVES_MILLIS); 
	//debugger;
	
	
	return {"board":quoridorField, "stats":statsDiv, "multiplayerDiv":multiplayerDiv} ;

	/**/
	//aGame.outputWalls();
	/*
	var movesHistory = ["n","s","n","s","n","s","3d","3g","e3","s","c4","sw","nw","nn","nn","w","n","s","n"];
	var replay = new GameReplay(aGame, movesHistory);
	replay.replay();
	/**/
	// 20171022 bug: 
	// quoridor.js:339 d8,e8,7f,7c,n,7a,7h,e6,d6,d4,e4,d2,e2,1c,1e	
	
	/*	
	aGame.playTurnByVerboseNotation("n");
	aGame.playTurnByVerboseNotation("s");
	aGame.playTurnByVerboseNotation("n");
	aGame.playTurnByVerboseNotation("3d");
	aGame.playTurnByVerboseNotation("e");
	aGame.playTurnByVerboseNotation("3f");
	aGame.playTurnByVerboseNotation("c2");
	aGame.playTurnByVerboseNotation("s");
	aGame.playTurnByVerboseNotation("e");
	aGame.playTurnByVerboseNotation("3h");
	aGame.playTurnByVerboseNotation("4b");
	aGame.playTurnByVerboseNotation("4d");
	aGame.playTurnByVerboseNotation("a5");
	aGame.playTurnByVerboseNotation("6a");
	aGame.playTurnByVerboseNotation("4f");
	aGame.playTurnByVerboseNotation("4h");
	*/
}

function test(instance){
	alert("ijij");
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


function Game(boardDiv, statsDiv){
	
	// this.svgField = domElements["field"];
	// this.statsDiv = domElements ["stats"];
	this.boardDiv = boardDiv;
	this.statsDiv = statsDiv;
	
	
	this.walls_1 = [];
	this.walls_2 = [];
	this.svgPawns = [];
	this.svgLineSegments = [];
	this.svgCellsAsPawnShapes = []
	this.buildUpOptions(this.statsDiv);
	
	
	//this.board;
	this.board = new Board();
	this.buildUpBoard(this.boardDiv);
	this.outputPawns();
	
	this.play_song();
	
	//administration
	this.playerAtMove = PLAYER1;
	this.recordingOfGameInProgress = [];
	this.moveCounter = 0;
	this.gameStatus = SETUP;
	
	this.outputGameStats();
	
	//testing:
	
	//console.log(this.board.boardGraph);
	
	//console.log(test);
	//var graph = new Graph(this.board.boardGraph);
	
	
	//prepare game:
	this.board.isCurrentBoardLegal();
	this.shortestPathPerPlayer;
	this.outputBoard();
	this.gameStatus = PLAYING;
}



// Game.prototype.outputSavedGame = function(){
	// var aGame = new Game();
// }

Game.prototype.deleteGame = function (){
	this.walls_1 = [];
	this.walls_2 = [];
	this.svgPawns = [];
	this.svgLineSegments = [];
	this.svgCellsAsPawnShapes = []
	this.boardDiv.innerHTML = "";
	
	this.statsDiv.innerHTML = "";	
	//infoDiv = document.getElementById('info');
	
	document.getElementById('notation').innerHTML = "";
	document.getElementById('stats').innerHTML = "";
	
}


Game.prototype.moveHistoryToString= function(){
	var gameString = ""
	// for(var moveNumber =0; moveNumber<this.recordingOfGameInProgress.length;moveNumber++){
		// gameString += "#" + moveNumber + "#" +(this.recordingOfGameInProgress[moveNumber]);
		
	// }
	console.log(this.recordingOfGameInProgress.toString());
	
	
}

Game.prototype.loadBoard = function(gameString){
	var movesHistoryFromString = gameString.split(",");
	for (var i =0; i<movesHistoryFromString.length;i++){
		this.playTurnByVerboseNotation(movesHistoryFromString[i]);
	}
}


Game.prototype.multiplayerLoadBoard = function(gameString){
	this.loadBoard(gameString)
	
	//only one move is allowed to be made.
	this.moveCounterAtGameLoad = this.moveCounter;
	
	
	this.gameStatus = MULTIPLAYER_PLAYING
	
}


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

Game.prototype.interpreteVerboseNotation = function (verboseNotation){
	//sends back an array.[type of move, argument1, argument 2] (arguments depending on type of move.)
	
	//check gave up
	if (verboseNotation == "x" || verboseNotation == "X"){
		return [GAVEUP_MOVE,false]
	}
	
	//check pawnmove
	moveTranslated = this.pawnVerboseNotationToDirection(verboseNotation);
	if (moveTranslated != 666){
		return [PAWN_MOVE,moveTranslated,false];
	}
	
	//check wallmove.
	var moveTranslated = this.board.wallNotationToCellAndOrientation(verboseNotation);
	if (moveTranslated != false){
		return [WALL_MOVE,moveTranslated[0],moveTranslated[1]];
	}
	console.log("ASSERT ERROR no valid notation found");
	return [ILLEGAL_MOVE,false,false];
}


Game.prototype.playTurnByVerboseNotation = function( verboseNotation){
	
	if (this.gameStatus ==MULTIPLAYER_PLAYING){
		console.log("multiplayer move.");
		if ( this.moveCounter > this.moveCounterAtGameLoad){
			// console.log()
			alert("Only one move allowed in multiplayer mode, please undo or submit.");
			return false;
		};
	}else if (this.gameStatus == REPLAY){
		console.log("replay mode. automatic.");
		
	}else if (this.gameStatus != PLAYING){
		
		console.log("game finished, restart to replay.  status: %d", this.gameStatus	);
		return false;
	}
	
	
	moveData = this.interpreteVerboseNotation(verboseNotation);
	if (moveData[0] == ILLEGAL_MOVE){
		console.log("ASSERT ERROR : ILLEGAL MOVE");
		return false;
	}
	
	var validMove = false;
	var undoWallValid= false; //check if the move can be undone.
	if (moveData[0] == GAVEUP_MOVE){
		console.log ("player %s gave up... (not implemented yet...) (%s)", PLAYER_NAMES[this.playerAtMove], verboseNotation);
		validMove = false;
	}else if (moveData[0] == PAWN_MOVE){
		var success = this.movePawnByVerboseNotation(this.playerAtMove,verboseNotation);
		if (!success){
			console.log("ASSERT ERROR pawn move failed...");
		}
		console.log("player %s moved pawn (%s)", PLAYER_NAMES[this.playerAtMove], verboseNotation);
		validMove= true;
	}else if (moveData[0] == WALL_MOVE){
		this.placeWallByVerboseNotation(this.playerAtMove,verboseNotation);
		console.log("player %s placed wall (%s)  (player %s)", PLAYER_NAMES[this.playerAtMove], verboseNotation, this.playerAtMove);
		validMove = true;
		undoWallValid  = true;
	}else {
		console.log("wrong notation? invalid move? --> please correct this move: %s", verboseNotation);
		validMove = false;
	}
	
	if (!validMove){
		return false;
	}
	
	if (!this.board.isCurrentBoardLegal()){
		console.log("undo move");
		alert("move not allowed, there must be a path to at least one of the squares on the other side of the board for both players!");
		if (undoWallValid){
			this.undoLastWall(this.playerAtMove);
		}else{
			console.log("ASSERT ERROR: we have an illegal board situation without having placed a wall. This is not yet covered. Not undone, board corrupted.");
		}
		return false;
	}
	
	//check if there is a winner
	if (this.board.isThereAWinner()[0]){
		console.log("The winner of the game is player %d",this.board.isThereAWinner()[1]+1);
		//this.playerAtMove =  (this.playerAtMove-1)*-1; //sets 0 to 1 and 1 to 0 //set previous player back to winner...
		this.gameStatus = FINISHED;
		//console.log(this.board.isThereAWinner());
	}else{
		//prepare for next move.
		this.playerAtMove =  (this.playerAtMove-1)*-1; //sets 0 to 1 and 1 to 0
		this.moveCounter++;
		//this.indicateActivePlayer(); //do this at board output
	}
		
	//administration	
	this.recordingOfGameInProgress.push(verboseNotation);
	this.outputGameStats();
	this.outputBoard();
	
	this.moveHistoryToString();

	return true;
}

// function cloneObject(obj) 
// {
	// //http://stackoverflow.com/questions/10151216/javascript-cloned-object-looses-its-prototype-functions
   // obj = obj && obj instanceof Object ? obj : '';

   // // Handle Date (return new Date object with old value)
   // if (obj instanceof Date) {
     // return new Date(obj); 
   // }

   // // Handle Array (return a full slice of the array)
   // if (obj instanceof Array) {
     // return obj.slice();
   // }

   // // Handle Object
   // if (obj instanceof Object) {
     // var copy = new obj.constructor();
     // for (var attr in obj) {
         // if (obj.hasOwnProperty(attr)){
             // if (obj[attr] instanceof Object){
                 // copy[attr] = cloneObject(obj[attr]);
             // } else {
                 // copy[attr] = obj[attr];
             // }
         // }
     // }
     // return copy;
   // }

   // throw new Error("Unable to copy obj! Its type isn't supported.");
// }


// function clone(destination, source) {
	// for (var property in source) {
		// if (typeof source[property] === "object" && source[property] !== null && destination[property]) { 
			// clone(destination[property], source[property]);
		// } else {
			// destination[property] = source[property];
		// }
	// }
// };

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
Game.prototype.undoLastMove =function(){
	
	
	
	
	if (this.recordingOfGameInProgress.length <= 0){
		console.log ("Nothing to undo yet...");
		return false;
	}
	var lastMoveVerbose = this.recordingOfGameInProgress[this.recordingOfGameInProgress.length - 1];
	var lastMovedPlayer = this.recordingOfGameInProgress.length %2 == 0;
	var lastMoveData = this.interpreteVerboseNotation(lastMoveVerbose);
	
	console.log("player " + BOARD_PAWN_2_COLOR + "moved last?:"+ lastMovedPlayer);
	console.log("total number of moves before undo:"+ (this.recordingOfGameInProgress.length));
	console.log("lastMoveData: "+ lastMoveData);
	// debugger;
}

Game.prototype.outputGameStats= function(){
	var htmlString = "";
	
	if (this.gameStatus == SETUP){
		htmlString += 'Blue Player starts the game.'
	} else if (this.gameStatus == FINISHED){
		htmlString += ''+ PLAYER_NAMES[this.playerAtMove] + ' player won!';
		
	}else if (this.gameStatus == PLAYING){
		var redMovesToFinish = this.board.shortestPathPerPlayer[1].length-1;
		var blueMovesToFinish = this.board.shortestPathPerPlayer[0].length-1;
		htmlString += 'Estimated number of moves to finish:';
		htmlString += '<br>'+ blueMovesToFinish + ' for blue player.';
		htmlString += '<br>'+ redMovesToFinish + ' for red player.';
		
		htmlString += '<br><br>'+ PLAYER_NAMES[this.playerAtMove] + ' player playing.';
	}
	
	//notation field
	notationDiv = document.getElementById('notation');
	document.getElementById('stats').innerHTML = htmlString;
	htmlString = '<br><br>Move history: ';
	notationDiv.innerHTML = htmlString;

	for (var i =0; i<this.recordingOfGameInProgress.length;i++){
		
		
		if (i%2 == 0){
			addBr(notationDiv);
			var text = addText(notationDiv,(i+1)+". ", i+"stat", i+"stat" );
		}else{
			 addText(notationDiv, " ", i+"stat",i+"stat" );
		}
		var button = addButtonToExecuteGeneralFunction(notationDiv,this.recordingOfGameInProgress[i],"step"+i ,"step"+i , this.rewindGameTextClicked, [this, i+1]  );
		button.style.width = BUTTON_STATS_MOVE_WIDTH_PIXELS;
	}	
}

Game.prototype.placeWallByVerboseNotation = function(player, wallPosNotation){
	//check if notation is correct.
	var isValidMove  = this.board.placeWallByVerboseCoordinate(player,wallPosNotation);
	this.outputWalls();
	return isValidMove;	
}

Game.prototype.movePawnByVerboseNotation = function(player, verboseCoordinate ){
	var direction = this.pawnVerboseNotationToDirection(verboseCoordinate);
	if (direction == 666){
		console.log("ASSERT ERROR non valid verbose coordinate.");
	}
	
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
		return 666;
	}else{
		return direction;
	}
}

Game.prototype.outputBoard = function(){
	this.eraseCellAsCircleElements();
	this.outputWalls();
	this.outputShortestPath(this.playerAtMove);
	this.outputPawns();
	this.indicateActivePlayer();
	this.setCellAsCircleElementsPlayerFinishLines();
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
	//console.log("x:%d", x);
	
	var type = getTypeOfSvgElement(this.svgPawns[player]);
	
	if (type == "circle"){
		this.svgPawns[player].setAttribute("cx", (pawnCoords[1]+0.5) * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_X_OFFSET_SCALED);
		this.svgPawns[player].setAttribute("cy", (pawnCoords[0]+0.5) * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED);
	}else if (type == "polygon"){		
		//set offset to center of square.
		this.svgPawns[player].setAttribute("transform",'translate(' 
				+((pawnCoords[1]+0.5) * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_X_OFFSET_SCALED)
				+' '+ ((pawnCoords[0] + 0.5) * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED )+ ")" );
	}else{
		console.log ("ASSERT ERROR pawn not circle nor polygon.");
	}
}

Game.prototype.eraseCellAsCircleElements = function(){
	for(var cellId =0; cellId<this.svgCellsAsPawnShapes.length;cellId++){
		this.svgCellsAsPawnShapes[cellId].setAttribute('fill',BOARD_CELL_PAWNCIRCLE_COLOR_INACTIVE);
		this.svgCellsAsPawnShapes[cellId].setAttribute('fill-opacity',BOARD_CELL_PAWNCIRCLE_COLOR_INACTIVE_TRANSPARENCY);
	}
}
Game.prototype.setCellAsCircleElementsPlayerFinishLines = function(){
	var playerFinishColours = [BOARD_CELL_PAWNCIRCLE_FINISH_COLOR_PLAYER_1, BOARD_CELL_PAWNCIRCLE_FINISH_COLOR_PLAYER_2 ];
	//for(var i=0; i<2; i++){
		for (var cellIndex=0;cellIndex<9;cellIndex++){
			this.svgCellsAsPawnShapes[FINISH_CELLS_LOOKUP_TABLE[this.playerAtMove][cellIndex]].setAttribute('fill',playerFinishColours[this.playerAtMove]);
			this.svgCellsAsPawnShapes[FINISH_CELLS_LOOKUP_TABLE[this.playerAtMove][cellIndex]].setAttribute('fill-opacity',BOARD_CELL_PAWNCIRCLE_FINISH_COLOR_PLAYER_TRANSPARENCY);
		}
	//}
	
}

Game.prototype.outputShortestPath = function(player){
	// console.log(player);
	// console.log(this.board.shortestPathPerPlayer);
	var cells = this.board.shortestPathPerPlayer[player];
	// console.log(cells);
	for (var i =  1; i<cells.length;i++){
		this.svgCellsAsPawnShapes[cells[i]].setAttribute('fill',BOARD_CELL_PAWNCIRCLE_COLOR_SHORTEST_PATH_INDICATION);
		this.svgCellsAsPawnShapes[cells[i]].setAttribute('fill-opacity',BOARD_CELL_PAWNCIRCLE_COLOR_SHORTEST_PATH_INDICATION_TRANSPARENCY);
		
	}
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
	this.eraseCellAsCircleElements(); //erase shortest path or other thingies
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
	this.eraseCellAsCircleElements(); //erase shortest path or other thingies
	this.mouseWallEvent(callerElement,true, false);
}
Game.prototype.mouseHoversOutWallElement = function (callerElement){
	this.mouseWallEvent(callerElement, false, false);
}
Game.prototype.mouseWallEvent = function (callerElement,isHoveringInElseOut,placeWallIfAllowed){
	var lineIndex= parseInt(callerElement.id);
	//line segments are half cell width, so there are two of them per cell.
	
	var colors = [[BOARD_LINE_HOVER_WALL_NOT_POSSIBLE_COLOR, BOARD_LINE_HOVER_WALL_POSSIBLE_COLOR ],[BOARD_LINE_COLOR, BOARD_LINE_COLOR]];
	if (isHoveringInElseOut){
		isHoveringInElseOut = 0;
	}else{
		isHoveringInElseOut =1;
	}
	
	if (lineIndex < 144){
		// horizontal (lines 0--> 143)
		
		//get same cell neighbour line 
		var sameCellLineIndex = lineIndex-1;
		if (lineIndex % 2 == 0){
			sameCellLineIndex = lineIndex+1;
		}
		var affectedLinesIndeces = [lineIndex, sameCellLineIndex];
		
		var isNorthSouthOriented = false; 
		var startCellId = parseInt(lineIndex/2);
				
		if ( lineIndex %18 == 0 || lineIndex % 18 == 17){
			//extremities have no neighbours. 
			//neighbourCellId = 666; //illegal neighbour
			startCellId  = 8; // if startcell is 0, it would allow to place a wall.... so, give it an illegal wall place startcell number. 
		}else{
			//define neighbourcells.
			if (lineIndex % 2 == 0){
				//Western neighbour
				
				startCellId = startCellId - 1;
				//var neighbourCellId = startCellId + 1;
				affectedLinesIndeces.push(lineIndex-1);
				affectedLinesIndeces.push(lineIndex-2);
			}else{
				//eastern neighbour
				//var neighbourCellId = startCellId + 1;
				affectedLinesIndeces.push(lineIndex+1);
				affectedLinesIndeces.push(lineIndex+2);
			}
		}
	}else{
		//is vertical
		//get same cell neighbour line 
		var hoveredLineIndex = lineIndex;
		if (lineIndex % 18 >= 9){
			//south oriented line clicked in the cell...
			lineIndex = lineIndex - 9;
			var sameCellLineIndex = lineIndex+9;
		}else{
			var sameCellLineIndex = lineIndex+9;
		}
		var affectedLinesIndeces = [lineIndex, sameCellLineIndex];
		
		var isNorthSouthOriented = true;
		//var neighbourCellId;
		if ( hoveredLineIndex <=151 ){
			//northern extremity
			//neighbourCellId = 666; //illegal neighbour
			startCellId  = 8; // if startcell is 0, it would allow to place a wall.... so, give it an illegal wall place startcell number. 
			
		}else if ( hoveredLineIndex >= 297){
			//southern extremity.
			//extremities have no neighbours. 
			//neighbourCellId = 666; //illegal neighbour
			startCellId  = 8; // if startcell is 0, it would allow to place a wall.... so, give it an illegal wall place startcell number. 
			
		}else{
			
			//check startcellId
			var startCellId =  (parseInt(lineIndex/18) -8	)*9 + lineIndex%18;
			
			if (hoveredLineIndex % 18 >= 9){
				//southern line --> neighbour south
				affectedLinesIndeces.push(hoveredLineIndex + 9);
				affectedLinesIndeces.push(hoveredLineIndex + 18);
				//neighbourCellId = startCellId+9;
			}else{
				//northern line --> neighbour north
				affectedLinesIndeces.push(hoveredLineIndex - 9);
				affectedLinesIndeces.push(hoveredLineIndex - 18);
				startCellId = startCellId-9;
				//neighbourCellId = startCellId+9;
			}	
		}
	}
	
	if (placeWallIfAllowed){
		if(this.board.placeWall (PLAYER1, startCellId, isNorthSouthOriented, true)){
			var verboseNotationWallPlacement = this.wallToVerboseNotation(startCellId, isNorthSouthOriented);
			this.playTurnByVerboseNotation(verboseNotationWallPlacement);
		}
	}else{	
		//colorize line
		var placementIsPossible = this.board.isPositionAvailableForWallPlacement(startCellId, isNorthSouthOriented)?1:0;
		for (var i = 0; i<affectedLinesIndeces.length; i++){
		
			this.svgLineSegments[affectedLinesIndeces[i]].setAttribute('stroke',colors[isHoveringInElseOut][placementIsPossible]);
		}	
	}
}

Game.prototype.undoButtonClicked = function(GameInstance){
	console.log("undo button clicked.");
	//this.undoLastWall(this.playerAtMove);
	
	//this.undoLastWall(this.);
	//console.log(GameInstance.recordingOfGameInProgress);
	
	//GameInstance.undoLastWall(GameInstance.playerAtMove);
	//GameInstance.undoLastMove();
	console.log(GameInstance);
	// debugger;

	GameInstance.undoNumberOfSteps(1);
	//GameInstance.rewindGametoPosition(1);
}

Game.prototype.rewindGameTextClicked = function(GameInstance, moveEndNumber){
	
	
	
	console.log("rewind text clicked.");
	

	var userHasConfirmed = confirm("warning: All game moves from the clicked step will be lost. Continue?");
	// debugger;

	if (userHasConfirmed){
		GameInstance.rewindGameToPosition(moveEndNumber);
	}
	
}

Game.prototype.rewindGameToPosition = function(moveEndNumber){
	//will rewind game to indicated position
	//moveNumber 1 is first move
	
	
	// if (this.gameStatus == MULTIPLAYER_PLAYING && this.moveCounter <= this.moveCounterAtGameLoad){
	if (this.gameStatus == MULTIPLAYER_PLAYING && moveEndNumber < this.moveCounterAtGameLoad){
		console.log("not allowed to go back further than game load in multiplayer,");
		alert("not allowed to go back further than game load in multiplayer");
		return;
	}
	
	var saveGame = JSON.parse(JSON.stringify(this.recordingOfGameInProgress));
	if (this.gameStatus == MULTIPLAYER_PLAYING ){
		
		var tmp = this.moveCounterAtGameLoad;
		// console.log(this.moveCounterAtGameLoad);
		this.eraseBoard();
		this.moveCounterAtGameLoad = tmp;
		// console.log(this.moveCounterAtGameLoad);
		this.gameStatus = MULTIPLAYER_PLAYING;
		
		
		for (var moveNumber = 0; moveNumber<  moveEndNumber; moveNumber++){
			this.playTurnByVerboseNotation(saveGame[moveNumber]);
		}
		
	}else if (this.gameStatus == REPLAY){
		var saveGameForReplay = JSON.parse(JSON.stringify(this.replaySaveMoves));
		var tmp = this.moveCounterAtGameLoad;
		this.eraseBoard();
		
		this.moveCounterAtGameLoad = tmp;
		this.gameStatus = REPLAY;
		
		for (var moveNumber = 0; moveNumber<  moveEndNumber; moveNumber++){
			//all moves shift one, so we start with a blank board.
			if (moveNumber>0){
				this.playTurnByVerboseNotation( saveGameForReplay[moveNumber-1]);	
			}
		} 
		 
	}else{
		this.eraseBoard();
		
		
		for (var moveNumber = 0; moveNumber<  moveEndNumber; moveNumber++){
			this.playTurnByVerboseNotation(saveGame[moveNumber]);
		}
	}
	
		
}

Game.prototype.undoNumberOfSteps= function(numberOfSteps){
	
	
	//redo the moves like in the previous game.
	//console.log(this.recordingOfGameInProgress.length - numberOfSteps);
	//var saveGame = this.recordingOfGameInProgress;
	this.rewindGameToPosition(this.recordingOfGameInProgress.length - numberOfSteps);
}


Game.prototype.eraseBoard = function(){
	//erases everything from the board, and basically resets the game within the game. 
	//created for use in undo. 
	
	this.walls_1 = [];
	this.walls_2 = [];
	this.svgPawns = [];
	this.svgLineSegments = [];
	this.svgCellsAsPawnShapes = []
	
	this.board = new Board();
	this.boardDiv.innerHTML = "";
	this.buildUpBoard(this.boardDiv);
	this.outputPawns();
		
	//administration
	this.playerAtMove = PLAYER1;
	this.recordingOfGameInProgress = [];
	this.moveCounter = 0;
	this.gameStatus = SETUP;
	
	this.outputGameStats();
	
	//prepare game:
	this.board.isCurrentBoardLegal();
	this.shortestPathPerPlayer;
	this.outputBoard();
	this.gameStatus = PLAYING;
}


Game.prototype.buildUpOptions = function(domElement){
	// addButtonToExecuteGeneralFunction(elementToAttachTo,caption,name, id, func,arg){
	//addButtonToExecuteGeneralFunction(domElement,"undooo","lode", "lloodd", this.clickTest,"arg");
	
	//https://stackoverflow.com/questions/2190850/create-a-custom-callback-in-javascript
	addButtonToExecuteGeneralFunction(domElement,"Undo","lode", "lloodd", this.undoButtonClicked,this);
	addButtonToExecuteGeneralFunction(domElement,"Display Notation","displayNotation", "displayNotation", this.toggleNotation,this);
	addButtonToExecuteGeneralFunction(domElement,"Replay","replayGame", "replayGame", this.replay,this);
	
	//addButtonToExecuteGeneralFunction(domElement,"cutie pie","fefe", "wwww", this.testPhp,this);
	//addButtonToExecuteGeneralFunction(domElement,"replay","replayMoves", "replyMoves", this.replay,this);
	
	
}


Game.prototype.replay = function (instance){
	// Manager.prototype.replayGameString = function (gameString){
	// this.startNewGame();
	// this.replayGame = new GameReplay (this.localGame, gameString);
	
// }
	instance.gameStatusMemory = instance.gameStatus
	instance.gameStatus = REPLAY;
	
	instance.replaySaveMoves  = instance.recordingOfGameInProgress;
	
	console.log(instance.recordingOfGameInProgress);
	
	instance.replayCounter = 0;
	
	
	instance.replayLoop(instance);
}

Game.prototype.stopReplay = function (instance){
	// Manager.prototype.replayGameString = function (gameString){
	// this.startNewGame();
	// this.replayGame = new GameReplay (this.localGame, gameString);
	
// }
	instancegameStatus= instance.gameStatusMemory ;
	rewindGameToPosition(this.recordingOfGameInProgress.length-1)
	
}

Game.prototype.replayLoop = function (instance){
	console.log(" steps to do?");
	console.log(instance.replayCounter < instance.replaySaveMoves.length);
	if (instance.replayCounter < instance.replaySaveMoves.length +1 ){
		console.log("-----------efefe");
		//console.log("player moving: %d",moveCounter%2 );
		// window.setTimeout(this.callback(moveCounter%2, this.recordedGame[moveCounter]),GAME_REPLAY_TIME_BETWEEN_MOVES_MILLIS); 
		
		window.setTimeout(function (){instance.callbackReplay(instance.replayCounter )}.bind(instance),GAME_REPLAY_TIME_BETWEEN_MOVES_MILLIS); 
		instance.replayCounter += 1;
		console.log(instance.replayCounter);
		console.log(instance.replaySaveMoves);
	}
}

Game.prototype.callbackReplay = function( endPositionStep ){
	// return function(){
			
       // this.qgame.movePawn(player, direction);
	   // this.moveCounter += 1;
	   
	   // this.replay(this.moveCounter);
    // }
	//this.replayGame.playTurnByVerboseNotation( verboseMove);
	//this.moveCounter += 1;
	
	//console.log(verboseMove);
	this.rewindGameToPosition(endPositionStep);
	this.replayLoop(this);
}



// Game.prototype.replay=  function(gameInstance){
	// var replayButton = document.getElementById("replayMoves");
	// button.removeEventListener('click', function(){
				// func(arg[0],arg[1]); 
				// //alert("dokeof");
				// });
	
// }

// Game.prototype.stopReplay = function(gameInstance){
	
// }

Game.prototype.toggleNotation = function (instance){
	NOTATION_ENABLED_AT_STARTUP = !NOTATION_ENABLED_AT_STARTUP;
	// this.outputGameStats();
	var div = document.getElementById('notation');
	
	if (NOTATION_ENABLED_AT_STARTUP){
		div.removeAttribute("hidden"); 
		
	}else{
		
		var att = document.createAttribute("hidden");       
		//att.value = "democlass";                           // Set the value of the class attribute
		div.setAttributeNode(att); 
	}
}


Game.prototype.testPhp =  function(gameInstance)
 {
      // var r=confirm("Do You Really want to Refund money! Press ok to Continue ");
      // if (r==true)
        // {
        // // window.location="yourphppage.php";
        // window.location="http://lode.ameije.com/sandbox.php";
        // return true;
        // }
           // else
        // {
        // alert("You pressed Cancel!");
        // }
		 
		 
		 // //http://www.webdeveloper.com/forum/showthread.php?252811-run-php-script-in-background-with-js
		// var str = "something=dog";
		//var url = "http://lode.ameije.com/sandbox.php?q=666";// No question mark needed
		
		// xmlReq=new XMLHttpRequest();
		
		// xmlReq.open("POST",url,true);
		// xmlReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		// xmlReq.setRequestHeader("Content-length", str.length);
		// xmlReq.setRequestHeader("Connection", "close");
		// xmlReq.send(str);
		// console.log(xmlReq);
		// console.log("done");

	// var url = "http://lode.ameije.com/sandbox.php?q=666&action=test";// No question mark needed
	var url = "http://lode.ameije.com/sandbox.php?q=666&action=read";// No question mark needed
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("testAJAX").innerHTML = this.responseText;
		}
	};
	
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
		
 }

Game.prototype.buildUpBoard = function(boardDiv){
	//wall lines:
	//all line segements go in an array, their position index corresponds with their ID.
	//horizontal line segments: correspond with cell ID (with cell on the west)
	//vertical line segments, after subtracting by 72 (=number of horizontal line segments) correspond with cell ID(with cell on the north)
	
	var svgElement = addSvg(boardDiv, "quoridorFieldSvg",BOARD_WIDTH*BOARD_SCALE, BOARD_HEIGHT*BOARD_SCALE,BOARD_BACKGROUND_COLOR,"black");
	//var statsDiv = document.createElement('div');
	//statsDiv.id = 'statsDiv';
	//statsDiv.className = 'stats';
	//document.getElementById('statsDiv').innerHTML += '<br>Some new content!';
	
	//statsDiv.innerHTML += '<br>TestGame';
	//quoridorField.appendChild(statsDiv);
	
	//var field = document.getElementById("quoridorFieldSvgsvgElement");	
	
	
	var index = 0;
	//horizontal lines
	for (var i=0; i<8;i++){
		
		// x1, y1, x2, y2
		for (var j=0; j<18;j++){
			// createLine(svgElement, 0*BOARD_SCALE + BOARD_X_OFFSET_SCALED, i*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED , BOARD_SQUARE_SPACING*9*BOARD_SCALE + BOARD_X_OFFSET_SCALED, i*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, BOARD_LINE_COLOR, 10*BOARD_SCALE);	
			this.svgLineSegments.push(createLine(svgElement, 
			(j) * (BOARD_SQUARE_SPACING/2)*BOARD_SCALE + BOARD_X_OFFSET_SCALED,
			(i+1) * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED ,
			(j+1) * (BOARD_SQUARE_SPACING/2)*BOARD_SCALE + BOARD_X_OFFSET_SCALED, 
			(i+1)*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, 
			BOARD_LINE_COLOR, BOARD_LINE_WIDTH*BOARD_SCALE, index)	//BOARD_LINE_COLOR
			);
			
			this.svgLineSegments[index].addEventListener("mouseover", function (event){this.mouseHoversInWallElement(event.target);}.bind(this)); //works, sends back line#id
			this.svgLineSegments[index].addEventListener("mouseout", function (event){this.mouseHoversOutWallElement(event.target);}.bind(this)); //works, sends back line#id
			this.svgLineSegments[index].addEventListener("click", function (event){this.mouseClickWallElement(event.target);}.bind(this)); //works, sends back line#id
			index+= 1;
		}
	}
	
	//add vertical lines (cell sized)
	for (var i=0; i<18;i++){
		// x1, y1, x2, y2
		for (var j=0; j<9;j++){
			//j<8 is sufficient, but we use the id to link it to a cell, as this is also the index in the array, we want to keep things easier. (the other EAST vertical pieces are ON the board edge)
			
			// createLine(svgElement, 0*BOARD_SCALE + BOARD_X_OFFSET_SCALED, i*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED , BOARD_SQUARE_SPACING*9*BOARD_SCALE + BOARD_X_OFFSET_SCALED, i*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, BOARD_LINE_COLOR, 10*BOARD_SCALE);	
			this.svgLineSegments.push(createLine(svgElement, 
			(j+1) * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_X_OFFSET_SCALED,
			 i* (BOARD_SQUARE_SPACING/2)*BOARD_SCALE + BOARD_Y_OFFSET_SCALED ,
			(j+1) * BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_X_OFFSET_SCALED, 
			(i+1)*(BOARD_SQUARE_SPACING/2)*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, 
			BOARD_LINE_COLOR, BOARD_LINE_WIDTH*BOARD_SCALE, index)	//BOARD_LINE_COLOR
			);
			//lines[lines.length-1].addEventListener("mouseover", function() { this.setAttribute('stroke', 'red') });
			//lines[lines.length-1].addEventListener("mouseout", function() { this.setAttribute('stroke', 'blue') });
			
			this.svgLineSegments[index].addEventListener("mouseover", function (event){this.mouseHoversInWallElement(event.target);}.bind(this)); //works, sends back line#id
			this.svgLineSegments[index].addEventListener("mouseout", function (event){this.mouseHoversOutWallElement(event.target);}.bind(this)); //works, sends back line#id
			this.svgLineSegments[index].addEventListener("click", function (event){this.mouseClickWallElement(event.target);}.bind(this)); //works, sends back line#id
			index+= 1;
		}
	}
	
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
				this.svgCellsAsPawnShapes[index].addEventListener("click", function (event){this.mouseClickCellAsPawnCircleElement(event.target);}.bind(this)); //works, sends back line#id
				this.svgCellsAsPawnShapes[index].addEventListener("mouseover", function (event){this.mouseHoversInCellAsPawnCircleElement(event.target);}.bind(this)); //works, sends back line#id
				this.svgCellsAsPawnShapes[index].addEventListener("mouseout", function (event){this.mouseHoversOutCellAsPawnCircleElement(event.target);}.bind(this)); //works, sends back line#id
		}
	}
	
	//players init --> set position to just somewhere on the board....
	//player 1
	////////pawns.push(add_circle(svgElement, 450*BOARD_SCALE + BOARD_X_OFFSET_SCALED, 50*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, BOARD_PAWN_RADIUS *BOARD_SCALE, "pawn_player_1", BOARD_PAWN_1_COLOR));
	// this.svgPawns.push(add_circle(svgElement, 365*BOARD_SCALE + BOARD_X_OFFSET_SCALED,35*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, BOARD_PAWN_RADIUS *BOARD_SCALE, "pawn_player_1", BOARD_PAWN_1_COLOR));
	
	var squareSide = BOARD_SQUARE_SPACING*BOARD_SCALE;
	squareSideScaleToPawnCircle = squareSide *(BOARD_PAWN_RADIUS*2 /BOARD_SQUARE_SPACING);
	var halfSquareSide = squareSideScaleToPawnCircle/2;
	
	// var arrowCoords = ""+ squareSide /2 +"+ squareSide + " +  " + squareSide + ";
	// var arrowCoords = ""+squareSide /2 + " 0, "+ squareSide + " " + squareSide +", 0 " + squareSide;
	// var arrowCoords = "0 " + (-halfSquareSide) + ","+ halfSquareSide + " " + halfSquareSide + ",0 "+ halfSquareSide-10 + ", " +(-halfSquareSide) +" "  + halfSquareSide ;
	var arrowCoords = 
	"0 " + (-halfSquareSide) + 
	","+ halfSquareSide + " " + halfSquareSide + 
	",0 "+ (halfSquareSide-halfSquareSide/3)+ 
	", " +(-halfSquareSide) +" "  + halfSquareSide ;
	this.svgPawns.push(add_polygon(svgElement, arrowCoords,"black" ,BOARD_PAWN_1_COLOR,365*BOARD_SCALE + BOARD_X_OFFSET_SCALED,  35*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, 1,"pawn_player_1"));
		
	var arrowCoordsNorthStartingPlayer = 
	"0 "+ (-halfSquareSide+halfSquareSide/3)+ 
	", " +(halfSquareSide) +" "  + (-halfSquareSide)+
	",0 " + (halfSquareSide) + 
	","+ (-halfSquareSide) + " " + (-halfSquareSide);
	
	//player 2
	//pawns.push( add_circle(svgElement, 450*BOARD_SCALE + BOARD_X_OFFSET_SCALED, 850*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, BOARD_PAWN_RADIUS *BOARD_SCALE, "pawn_player_2", BOARD_PAWN_2_COLOR));
	//this.svgPawns.push( add_circle(svgElement, 666*BOARD_SCALE + BOARD_X_OFFSET_SCALED, 142*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, BOARD_PAWN_RADIUS *BOARD_SCALE, "pawn_player_2", BOARD_PAWN_2_COLOR));
	this.svgPawns.push(add_polygon(svgElement, arrowCoordsNorthStartingPlayer,"black" ,BOARD_PAWN_1_COLOR, 666*BOARD_SCALE + BOARD_X_OFFSET_SCALED, 142*BOARD_SCALE + BOARD_Y_OFFSET_SCALED, 1,"pawn_player_2"));
	
	for (var i = 0;i<2;i++){
		this.svgPawns[i].addEventListener("mouseover", function (event){this.mouseHoversInPawnElement(event.target);}.bind(this)); //works, sends back line#id
		this.svgPawns[i].addEventListener("mouseout", function (event){this.mouseHoversOutPawnElement(event.target);}.bind(this)); //works, sends back line#id
		//this.svgPawns[i].addEventListener("click", function (event){this.mouseClickPawnElement(event.target);}.bind(this)); //works, sends back line#id
		
		//add border
		this.svgPawns[i].setAttribute("stroke",BOARD_CELL_PAWNCIRCLE_BORDER_COLOR);
		this.svgPawns[i].setAttribute("stroke-width",BOARD_CELL_PAWNCIRCLE_BORDER_WIDTH);
	}
	
	//bottom walls unused placement.
	for (var i=0; i<10;i++){
		this.walls_1.push(createLine(svgElement, 
			(WALL_START_DISTANCE_FROM_BOARD_X + i * WALL_START_DISTANCE_FROM_EACH_OTHER) * BOARD_SCALE    ,
			9*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED + WALL_START_DISTANCE_FROM_BOARD_Y,  
			(WALL_START_DISTANCE_FROM_BOARD_X + i * WALL_START_DISTANCE_FROM_EACH_OTHER) * BOARD_SCALE,
			9*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED + WALL_START_DISTANCE_FROM_BOARD_Y + WALL_LENGTH * BOARD_SCALE, 
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
	if (BOARD_TEXT_NOTATION_ENABLED){
		//add text 
		for (var i=0;i<8;i++){
			add_text(svgElement, String.fromCharCode(i+97), "black", 
				BOARD_TEXT_NOTATION_SIZE * BOARD_SCALE,
				BOARD_X_OFFSET_SCALED + (BOARD_SCALE*BOARD_SQUARE_SPACING)*(i+1) - (BOARD_SCALE * BOARD_TEXT_NOTATION_SIZE/4), 
				9*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED + (BOARD_SCALE*BOARD_TEXT_NOTATION_SIZE), 
				"Verdana");
		}
		
		for (var i=0;i<8;i++){
			add_text(svgElement, String.fromCharCode(i+49), "black", 
				BOARD_TEXT_NOTATION_SIZE * BOARD_SCALE,
				BOARD_X_OFFSET_SCALED - (BOARD_SCALE * BOARD_TEXT_NOTATION_SIZE), 
				((7-i)+1)*BOARD_SQUARE_SPACING*BOARD_SCALE + BOARD_Y_OFFSET_SCALED + (BOARD_SCALE*BOARD_TEXT_NOTATION_SIZE/4), 
				"Verdana");
				//console.log(String.fromCharCode(i+97));
		}
	}
}
Game.prototype.beep = function() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
	snd.play();
}

Game.prototype.play_song = function(){
	//https://www.playonloop.com/2015-music-loops/cookie-island/
	if (SOUND_ENABLED_AT_STARTUP){
		var song = new Audio("POL-cookie-island-short.wav");
		song.play();
	}
}