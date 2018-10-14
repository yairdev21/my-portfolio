const GAME_FREQ = 1000;
const LIFE = '🎃';

// The Model
var gBoard;
var gGameInterval;
var gIsGameOn = false;



function init() {
    gBoard = createBoard();
    renderBoard(gBoard)
    gIsGameOn = true;
    if (gGameInterval) clearInterval(gGameInterval)
    gGameInterval = setInterval(play, GAME_FREQ);
}


function play() {
    gBoard = runGeneration(gBoard);
    renderBoard(gBoard);
}


function createBoard() {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board.push([])
        for (var j = 0; j < 8; j++) {
            board[i][j] = (Math.random()>0.5)? LIFE : ''
        }
    }
    return board;
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[i].length; j++) {
            strHTML += '<td>'
            strHTML += board[i][j]
            strHTML += '</td>'
        }
        strHTML += '</tr>';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;


    console.log(elBoard);
}

function runGeneration(board) {
    var newBoard = copyMat(board);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var noOfNeighbors = countNeighbors(i, j, board);
            if ((noOfNeighbors > 2) && (noOfNeighbors < 6)) {
                if (board[i][j] === '') newBoard[i][j] = LIFE;
            }
            else if (board[i][j] === LIFE) newBoard[i][j] = '';
        }
    }
    return newBoard;
}

function countNeighbors(cellI, cellJ, mat) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j] === LIFE) neighborsSum++;
        }
    }
    return neighborsSum;
}


function toggleGameOn(elBtn) {

    if (gIsGameOn) {
        elBtn.innerHTML = '▶';
        clearInterval(gGameInterval);
    } else {
        elBtn.innerHTML = '&#10074;&#10074;';
        gGameInterval = setInterval(play, GAME_FREQ);
    }
    gIsGameOn = !gIsGameOn;
}



