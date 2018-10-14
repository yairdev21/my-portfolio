'use str'

var gQuests = [];
var gCurrQuestIdx = 0;
var gRightModal = document.querySelector('.modal-right');
var gWrongModal = document.querySelector('.modal-wrong');
var gWinModal = document.querySelector('.modal-win');


function initGame() {
    createQuests();
    renderQuest(gQuests[0], gCurrQuestIdx);
}

function createQuests() {
    gQuests.push({ id: 1, opts: ['Panda', 'Lion'], correctOptIndex: 0 });
    gQuests.push({ id: 2, opts: ['Dog', 'Man\'s face'], correctOptIndex: 1 });
    gQuests.push({ id: 3, opts: ['Cat', 'Frog'], correctOptIndex: 1 });
}

function renderQuest(quest, currQuestIdx) {
    gRightModal.style.display = 'none';
    gWrongModal.style.display = 'none';
    var strHTML = '';
    strHTML += `
    <div class = "picture">
    <img src="img/${currQuestIdx + 1}.jpg">
</div>
<hr>
<div class = "sentence" onclick="checkAnswer(0)">${quest.opts[0]}</div>
<br>
<div class = "sentence" onclick="checkAnswer(1)">${quest.opts[1]}</div>`

    var elQuest = document.querySelector('.quest');
    elQuest.innerHTML = strHTML;
}

function checkAnswer(optIdx) {
    console.log('User Answer Idx:', optIdx);
    if (optIdx === gQuests[gCurrQuestIdx].correctOptIndex) {
        console.log('You Are Right!!!');
        gCurrQuestIdx++;
        gRightModal.style.display = 'block';
        if (gCurrQuestIdx < gQuests.length) {
            setTimeout(renderQuest, 1000, gQuests[gCurrQuestIdx], gCurrQuestIdx);
        }
        else {
            gWinModal.style.display = 'block';
            gRightModal.style.display = 'none';
        }
    }
    else {
        console.log('Try Again');
        gWrongModal.style.display = 'block';
        setTimeout(function () { gWrongModal.style.display = 'none' }, 700)
    }



}