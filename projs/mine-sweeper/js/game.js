'use strict';

var MINE = '&#128163';
var FLAG = '&#128681';
var SMILEY = '&#128578';
var SUNGLASSES = '&#128526';
var SAD = '&#128547';

var gBoard = [];
var gLevel = {
    LEVEL: 'Easy',
    SIZE: 4,
    MINES: 2
};
var gState = {};
var gTimeInterval;
var gIsTimeOn;
var gBestTime = {
    easy: Infinity,
    medium: Infinity,
    hard: Infinity
}


function init() {
    gState = {
        isGameOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
    };

    // init timer in model
    clearInterval(gTimeInterval);
    gIsTimeOn = false;
    // init timer in DOM
    var timeShow = document.querySelector('.timer');
    timeShow.innerText = 'Time: 0';
    // build and render the board
    gBoard = buildBoard();
    renderBoard(gBoard, '.board-container');
    // update flags counter in DOM
    var elMarkedCounter = document.querySelector('.marked-counter');
    var flagsLeft = (gLevel.MINES - gState.markedCount);
    elMarkedCounter.innerHTML = '&#128681: ' + flagsLeft;
    // shows easy level's best time - the page stars with easy level as default
    showBestTimeChosenLevel();
    // changes the smiley to normal smiley
    var elSmiley = document.querySelector('.smiley');
    elSmiley.innerHTML = SMILEY;
}

function buildBoard() {
    var SIZE = gLevel.SIZE;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            };
        }
    }
    return (board);
}


function cellClicked(elCell, i, j) {
    var currCell = gBoard[i][j];
    if (!gState.isGameOn || currCell.isMarked || currCell.isShown) return;

    // if first cell clicked
    if (gState.shownCount === 0) {
        firstCellClicked(i, j);
        elCell = document.querySelector('.cell' + i + '-' + j);
    }
    // update shown model
    currCell.isShown = true;
    gState.shownCount++;

    // update DOM to reveled cell
    elCell.classList.add('cell-reveled');
    elCell.classList.remove('cell')


    // if user clicked on mine
    if (currCell.isMine) mineClicked(elCell);

    else {

        if (currCell.minesAroundCount === 0) {
            expandShown(gBoard, elCell, i, j);
            showNegs(gBoard, i, j);
        }
        else elCell.innerText = currCell.minesAroundCount;
    }

    // if all flags are used before this click - check if game over
    if (gState.markedCount === gLevel.MINES) checkGameOver();
}

function firstCellClicked(i, j) {
    buildMinesInBoard(gBoard, i, j);
    setMinesNegsCount(gBoard);
    renderBoard(gBoard, '.board-container');

    // set timer
    if (gIsTimeOn) return
    gTimeInterval = setInterval(startGameTime, 1000);
    gIsTimeOn = true;

    // show the first second in DOM
    var firsrSecShow = document.querySelector('.timer');
    firsrSecShow.innerText = 'Time: 1'


}

function expandShown(board, elCell, i, j) {
    elCell.innerText = '';
    for (var negI = i - 1; negI <= i + 1; negI++) {
        if (negI < 0 || negI >= gLevel.SIZE) continue;
        for (var negJ = j - 1; negJ <= j + 1; negJ++) {
            if (negI === i && negJ === j) continue;
            if (negJ < 0 || negJ >= gLevel.SIZE) continue;
            var currNegCell = board[negI][negJ];
            if (currNegCell.isMine || currNegCell.isMarked
                || currNegCell.minesAroundCount !== 0 || currNegCell.isShown) continue;

            // update model
            gState.shownCount++;
            currNegCell.isShown = true;

            //  update DOM
            var elNegCell = document.querySelector('.cell' + negI + '-' + negJ);
            if (currNegCell.minesAroundCount === 0) elCell.innerText = '';
            else elNegCell.innerText = currNegCell.minesAroundCount;
            elNegCell.classList.add('cell-reveled')
            elNegCell.classList.remove('cell')

            // expand all empty cells
            expandShown(board, elNegCell, negI, negJ);

            // open the limited empty cell negs
            showNegs(board, negI, negJ);
        }
    }
}
//CR: a lot of this code is duplicated,

function showNegs(board, i, j) {
    for (var negI = i - 1; negI <= i + 1; negI++) {
        if (negI < 0 || negI >= gLevel.SIZE) continue;
        for (var negJ = j - 1; negJ <= j + 1; negJ++) {
            if (negI === i && negJ === j) continue;
            if (negJ < 0 || negJ >= gLevel.SIZE) continue;
            var currNegCell = board[negI][negJ];
            if (currNegCell.isShown || currNegCell.isMarked || currNegCell.isMine) continue;
            // update model
            gState.shownCount++;
            currNegCell.isShown = true;
            //  update DOM
            var elNegCell = document.querySelector('.cell' + negI + '-' + negJ);
            if (currNegCell.minesAroundCount === 0) elNegCell.innerText = '';
            else elNegCell.innerText = currNegCell.minesAroundCount;
            elNegCell.classList.add('cell-reveled')
            elNegCell.classList.remove('cell')
        }
    }
}



// stop the game and save the time
function checkGameOver() {
    var correctMarkCount = 0;
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var currCell = gBoard[i][j];
            if (currCell.isMine && currCell.isMarked) correctMarkCount++;
        }
    }
    var notMinesShownCount = (gLevel.SIZE * gLevel.SIZE) - gLevel.MINES;
    if (correctMarkCount === gLevel.MINES && gState.shownCount >= notMinesShownCount) {
        gState.isGameOn = false;
        clearInterval(gTimeInterval);

        // save and print best time for each level
        switch (gLevel.LEVEL) {
            case ("Easy"): gBestTime.easy = getBestTime(gState.secsPassed);
                break;
            case ("Medium"): gBestTime.medium = getBestTime(gState.secsPassed);
                break;
            case ("Hard"): gBestTime.hard = getBestTime(gState.secsPassed);
                break;
        }
        // change the smiley to sunglasses
        var elSmiley = document.querySelector('.smiley');
        elSmiley.innerHTML = SUNGLASSES;
    }
}

function LevelClicked(elLevel) {
    gState.isGameOn = false;
    var currLevel = '';
    currLevel += elLevel.innerText;
    switch (currLevel) {
        case ("Easy"): {
            gLevel = { LEVEL: 'Easy', SIZE: 4, MINES: 2 };
            showBestTimeChosenLevel();
        }
            break;
        case ("Medium"): {
            gLevel = { LEVEL: 'Medium', SIZE: 6, MINES: 5 };
            showBestTimeChosenLevel();

        }
            break;
        case ("Hard"): {
            gLevel = { LEVEL: 'Hard', SIZE: 8, MINES: 15 };
            showBestTimeChosenLevel();
        }
            break;
    }
    init();
}




