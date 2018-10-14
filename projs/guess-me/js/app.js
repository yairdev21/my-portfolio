'use strict';



$(document).ready(init);

function init() {
    var questsTree = getFromStorage('questsTree');
    if (questsTree) gQuestsTree = questsTree;
    else {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        saveToStorage('questsTree', gQuestsTree);
    }
    gCurrQuest = gQuestsTree;
}

function startGuessing() {
    $('.gameStart').hide('fade');
    renderQuest();
    setTimeout(function () {
        $('.gameQuest').show('fade');
    }, 500)
}

function renderQuest() {
    $(".gameQuest> h2").effect('fade')
    setTimeout(function () { $('.gameQuest> h2').text(gCurrQuest.txt) }, 300)


}

function userResponse(res) {
    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            // TODO: improve UX
            $(".gameQuest").effect('highlight')
            setTimeout(function () {
                $(".gameQuest").hide('puff')
            }, 700)
            setTimeout(function () {
                $('.gameEnd').show('pulsate');
            }, 1200)
        } else {
            $('.gameQuest').hide()
            setTimeout(function () {
                $('.gameNewQuest').show('bounce');
            }, 200)
        }
    } else {
        updateQuestsTreeNextQuest(res)
        renderQuest();
    }
}



function restartGame() {
    $('.gameNewQuest').hide('fade');
    $('.gameEnd').hide('fade');
    setTimeout(function () {
        $('.gameStart').show('fade');
    }, 500)
    updateQuestsRestartGame();
}



