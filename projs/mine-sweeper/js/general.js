'use strict';

function renderBoard(board, selector) {

    var elContainer = document.querySelector(selector);
    var cell;

    var strHTML = '<table class = "game-board"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            // if it's a flag don't revel it
            if (currCell.isMarked) cell = FLAG;
            else cell = '';
            var className = 'cell cell' + i + '-' + j;
            strHTML += `<td class="${className}"
             onclick="cellClicked(this, ${i} ,${j})"
             oncontextmenu="cellMarked(this, ${i} ,${j});return false;">${cell}
             </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    elContainer.innerHTML = strHTML;
}

function startGameTime() {
    var timeShow = document.querySelector('.timer');
    gState.secsPassed++;
    timeShow.innerText = 'Time: ' + gState.secsPassed;
}

function getBestTime(currTime) {
    var storageKey = gLevel.LEVEL + 'besttime';
    var bestTime = localStorage.getItem(storageKey)
    if (currTime < bestTime || bestTime === null) {
        // update model and local storage
        bestTime = currTime;
        localStorage.setItem(storageKey, currTime);
        // update DOM
        var elBestTime = document.querySelector('.best-time');
        elBestTime.innerHTML =  elBestTime.innerHTML = `<div class = "best-time">
        <table><tr><td> level:  ${gLevel.LEVEL} 
        &nbsp &nbsp &#x02736 &nbsp &nbsp</td>
        <td> The best time is: <br> ${localStorage.getItem(storageKey)} seconds</td></tr></table></div>`
    }
    return bestTime;
}
//CR: To much repeating HTML in JS should have written in the DOM.
function showBestTimeChosenLevel() {
    var storageKey = gLevel.LEVEL + 'besttime';
    var elBestTime = document.querySelector('.best-time');
    if (localStorage.getItem(storageKey) === null) {
        elBestTime.innerHTML = `<div class = "best-time">  
        <table><tr><td> level:  ${gLevel.LEVEL} 
        &nbsp &nbsp &#x02736 &nbsp &nbsp</td>
        <td> No record yet <br> Do the best time!</div>`
    }
    else {
        elBestTime.innerHTML = `<div class = "best-time">
        <table><tr><td> level:  ${gLevel.LEVEL} 
        &nbsp &nbsp &#x02736 &nbsp &nbsp</td>
        <td> The best time is: <br> ${localStorage.getItem(storageKey)} seconds</td></tr></table></div>`
    }
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}