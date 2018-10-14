'use strict';

function cellMarked(elCell, i, j) {
    var currCell = gBoard[i][j];
    if (!gState.isGameOn || currCell.isShown) return;


    if (!currCell.isMarked) {
        // dont let mark more flags than mines
        if (gState.markedCount >= gLevel.MINES) return;
        // update model
        gState.markedCount++;
        currCell.isMarked = true;
        // update DOM
        elCell.innerHTML = FLAG;
        elCell.classList.add('cell-marked')
    }
    else {
        // update model
        gState.markedCount--;
        currCell.isMarked = false;
         // update DOM
        elCell.innerHTML = '';
        elCell.classList.remove('cell-marked')
    }
    // update flags counter in DOM
    var elMarkedCounter = document.querySelector('.marked-counter');
    var flagsLeft = (gLevel.MINES - gState.markedCount);
    elMarkedCounter.innerHTML = '&#128681: ' + flagsLeft;

    // check if game over
    checkGameOver()

    // if clicked first - set timer
    if (gIsTimeOn) return;
    gTimeInterval = setInterval(startGameTime, 1000);
    //CR: lines 37 and 38 are not nessecarry//
    // show the first second
    var firsrSecShow = document.querySelector('.timer');
    firsrSecShow.innerText = 'Time: 1'
    gIsTimeOn = true;
}