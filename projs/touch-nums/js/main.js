'use strict'


var gNumbers = [];
var gCellLength = 4;
var gNumToClick;
var gTimeInterval;
var gCountTime;
var gIsGameStart;

function LevelClicked(elLevel) {
    var currLevel = '';
    currLevel += elLevel.innerText;
    switch (currLevel) {
        case ("Easy"): gCellLength = 4
            break;
        case ("Medium"): gCellLength = 5
            break;
        case ("Hard"): gCellLength = 6;
            break;
    }
    initGame();
}

function initGame() {
    gNumbers = [];
    gCountTime = 0;
    gNumToClick = 1;
    gIsGameStart = false;
    clearInterval(gTimeInterval)
    for (var i = 0; i < (gCellLength ** 2); i++) {
        gNumbers.push(i + 1);
    }
    gNumbers = shuffle(gNumbers);
    renderBoard(gNumbers);
    showNextNum();

}

function renderBoard(numbers) {
    var strHTML = ''
    var boardLength = gCellLength;
    var cellCount = 0;
    for (var i = 0; i < boardLength; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < boardLength; j++) {
            strHTML += '<td class = "cell" onclick="cellClicked(this)">'
            strHTML += numbers[cellCount];
            strHTML += '</td>'
            cellCount++;
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elClickedNum) {
    var currNum = +elClickedNum.innerText;
    console.log('currNum is:', currNum);
    if (currNum === gNumToClick) {
        gNumToClick++;
        elClickedNum.classList.add('right-click');
        showNextNum();
    }
    if (currNum === 1 && !gIsGameStart) {
        gTimeInterval = setInterval(startGameTime, 10);
        gIsGameStart = true;
    }
    if (currNum === (gCellLength ** 2) && (currNum === gNumToClick - 1)) {
        clearInterval(gTimeInterval);
        document.querySelector('.number').innerText = 'Victory!';
    }
}

function startGameTime() {
    var timeShow = document.querySelector('.time');
    gCountTime++;
    timeShow.innerText = 'Time:' + gCountTime / 100;
}

function showNextNum() {
    var nextNumShow = document.querySelector('.number');
    nextNumShow.innerText = gNumToClick;
}



function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}