'use strict';

function buildMinesInBoard(board, i, j) {
    var buildMineCount = 0;
    while (buildMineCount < gLevel.MINES) {
        var currMineI = getRandomIntInclusive(0, gLevel.SIZE - 1);
        var currMineJ = getRandomIntInclusive(0, gLevel.SIZE - 1);
        var currCell = board[currMineI][currMineJ];
        if (currCell.isMine || i === currMineI && j === currMineJ) continue;
            currCell.isMine = true;
            buildMineCount++;
        
    }
}

function setMinesNegsCount(board) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var minesCount = 0;
            if (!board[i][j].isMine) {
                //CR: it is more common to use var 'k' and var 'j'
                for (var negI = i - 1; negI <= i + 1; negI++) {
                    if (negI < 0 || negI >= gLevel.SIZE) continue;
                    for (var negJ = j - 1; negJ <= j + 1; negJ++) {
                        if (negI === i && negJ === j) continue;
                        if (negJ < 0 || negJ >= gLevel.SIZE) continue;
                        if (board[negI][negJ].isMine === true) minesCount++;
                    }
                }
                board[i][j].minesAroundCount = minesCount;
            }
        }
    }
}

// mine clicked - game stops and all mines reveled
function mineClicked(elCell) {
    clearInterval(gTimeInterval);
    gState.isGameOn = false;
    elCell.innerHTML = MINE;
    elCell.style.background = ('red');
    // show all mines
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var currCell = gBoard[i][j]
            var elCell = document.querySelector('.cell' + i + '-' + j);
            if (currCell.isMine) {
                // update model
                gState.shownCount++;
                elCell.innerHTML = MINE;
                // update DOM
                elCell.classList.add('cell-reveled')
                elCell.classList.remove('cell')
            }
        }
    }
    // change the smiley
    var elSmiley = document.querySelector('.smiley');
    elSmiley.innerHTML = SAD;
}