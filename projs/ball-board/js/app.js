const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE';

const GAMER_IMG = '<img src="img/gamer.png">';
const BALL_IMG = '<img src="img/ball.png">';
const GLUE_IMG = '<img src="img/glue.png">';

var gGamerPos;
var gBoard;
var gBallCount;
var elGameOverModal = document.querySelector('.game-over-modal');
var gameInterval;
var isCorner;
var gCouldMove = true



function init() {
	gGamerPos = { i: 2, j: 5 };
	gBoard = buildBoard();
	isCorner = false;
	gBallCount = 1;
	elGameOverModal.style.display = 'none';
	renderBoard(gBoard);
}

function buildBoard() {
	// Create the Matrix
	var board = new Array(10);
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(12);
	}

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: FLOOR, gameElement: null };
			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
				if (i === 0 && j === 5
					|| i === 5 && j === 0
					|| i === board.length - 1 && j === 5
					|| i === 5 && j === board[i].length - 1) {
					cell.type = FLOOR;
				}

			}
			board[i][j] = cell;
		}
	}
	// Place the gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;

	console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += '\t' + GAMER_IMG + '\n';
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	console.log('strHTML is:');
	console.log(strHTML);
	elBoard.innerHTML = strHTML;
	// Create new ball every 1.5 sec
	gameInterval = setInterval(addNewBall, 1500, gBoard);
	// Create a glue every 2 sec
	glueInterval = setInterval(addGlue, 2000, gBoard);
}

function addNewBall(board) {
	var randomI = getRandomInt(1, 9);
	var randomJ = getRandomInt(1, 11);
	// Update model
	var currCell = board[randomI][randomJ];
	if (currCell.gameElement !== GAMER) currCell.gameElement = BALL;

	// Update DOM
	if (currCell.gameElement === BALL) {
		var elNewBall = document.querySelector(`.cell-${randomI}-${randomJ}`)
		elNewBall.innerHTML = BALL_IMG;
	}
}

function addGlue(board) {

	var randomI = getRandomInt(1, 9);
	var randomJ = getRandomInt(1, 11);
	// Update model
	var currCell = board[randomI][randomJ];
	if (currCell.gameElement !== GAMER) currCell.gameElement = GLUE;

	// Update DOM
	if (currCell.gameElement === GLUE) {
		var elNewGlue = document.querySelector(`.cell-${randomI}-${randomJ}`)
		elNewGlue.innerHTML = GLUE_IMG;
		setTimeout(clearGlue, 3000, randomI, randomJ);
	}
}
// Clears the glue

function clearGlue(i, j) {
	// Update model
	if (gBoard[i][j].gameElement === GAMER) return;
	gBoard[i][j].gameElement = null;
	// Update DOM
	var elNewGlue = document.querySelector(`.cell-${i}-${j}`)
	elNewGlue.innerHTML = '';
	renderCell(gBoard[i][j].gameElement, '');
}

// Move the player to a specific location
function moveTo(i, j, isCorner) {
	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) || isCorner === true) {
		if (!gCouldMove) return;

		if (targetCell.gameElement === BALL) {
			console.log('Collecting!');
			var audioPop = new Audio('sound/pop.mp3');
			audioPop.play();
			var elH2 = document.querySelector('h2');
			elH2.innerText = `Balls Collected: ${gBallCount}`;
			gBallCount++;
		}

		// If the player steps on a glue
		if (targetCell.gameElement === GLUE) {
			console.log('GLUE');
			var audioGlue = new Audio('sound/glue.mp3');
			audioGlue.play();
			gCouldMove = false;
			setTimeout(function () { gCouldMove = true; }, 3000);
		}

		// MOVING
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		renderCell(gGamerPos, '');

		gGamerPos.i = i;
		gGamerPos.j = j;

		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		renderCell(gGamerPos, GAMER_IMG);

	} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);
	isCorner = false;
	// Stop the game if there are no balls
	if (isGameOn(gBoard) === false) {
		elGameOverModal.style.display = 'block';
		clearInterval(gameInterval);
		clearInterval(glueInterval);
	}
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			if (i === 5 && j === 0) moveTo(5, (gBoard[i].length - 1), true);
			else moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			if (i === 5 && j === (gBoard[i].length - 1)) moveTo(5, 0, true);
			else moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			if (i === 0 && j === 5) moveTo((gBoard.length - 1), 5, true);
			else moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			if (i === (gBoard.length - 1) && j === 5) moveTo(0, 5, true);
			else moveTo(i + 1, j);
			break;
	}
}

// makes the player that he cant move
// function dontMove() {
// 	console.log('dont move');
// 	switch (event.key) {
// 		case 'ArrowLeft':
// 		case 'ArrowRight':
// 		case 'ArrowUp':
// 		case 'ArrowDown':
// 			return;

// 	}
// }

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

// Chek if there are no balls left
function isGameOn(board) {
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			var currCell = board[i][j];
			if (currCell.gameElement === BALL) return true;
		}
	}
	return false;
}








function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}