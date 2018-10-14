'use strict';
var WALL = '#';
var FOOD = '.';
var EMPTY = ' ';
var SUPER_FOOD = '🥫';

var gBoard;
var gState = {
  score: 0,
  isGameDone: false
};
var gFoodNum = 0;
var gGameOverModal = document.querySelector('.game-over-modal');
var gVictoriousModal = document.querySelector('.victorious-modal');


function init() { 
  gState = {
    score: 0,
    isGameDone: false
  };
  gFoodNum = 0;
  gBoard = buildBoard();
  gGameOverModal.style.display = 'none';
  gVictoriousModal.style.display = 'none';


  createPacman(gBoard);
  createGhosts(gBoard);

  renderBoard(gBoard, '.board-container');
  console.table(gBoard);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gFoodNum++;
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j == 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
        gFoodNum--;
      }
      if (i === 1 && j === 1 ||
        i === 1 && j === SIZE - 2 ||
        i === SIZE - 2 && j === 1 ||
        i === SIZE - 2 && j === SIZE - 2) {
        board[i][j] = SUPER_FOOD;
        gFoodNum--;
      }

    }
  }
  return board;
}

// This function is called from both pacman and ghost to check engage
function checkEngage(cell, opponent) {
  if (cell === opponent) {

    //  basic support for eating power-ball (which is not in the game yet)
    if (gPacman.isSuper) {
      if (gIsFood) updateScore(1);
      for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]; 
        if (ghost.location.i===gPacman.location.i && ghost.location.j === gPacman.location.j)
        gGhosts.splice(i, 1);
      }
      console.log('Ghost is dead');

    }
    else return true;
  }
  return false;
}


// this function updates both the model and the dom for the score
function updateScore(value) {
  gState.score += value;
  document.querySelector('header > h3 > span').innerText = gState.score;
}

function gameOver() {
  clearInterval(gIntervalGhosts);
  gState.isGameDone = true;
  gGameOverModal.style.display = 'block';
}


