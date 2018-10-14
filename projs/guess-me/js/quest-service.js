'use strict'

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function updateQuestsTreeNextQuest(res) {
    //  update the prev, curr and res global vars
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res];
    gLastRes = res
}

function updateQuestsRestartGame() {
    //  update the prev, curr and res global vars
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}

function addGuess() {
    if ($('#newQuest').val() === '' || $('#newGuess').val() === '') restartGame();
    else {
        gPrevQuest[gLastRes] = createQuest($('#newQuest').val())
        gPrevQuest[gLastRes].yes = createQuest($('#newGuess').val())
        gPrevQuest[gLastRes].no = gCurrQuest;
        restartGame();
        saveToStorage('questsTree', gQuestsTree);
    }
}


function getFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}