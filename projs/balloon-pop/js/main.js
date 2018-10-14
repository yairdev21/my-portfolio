'use strict'

var gBalloons;
init();

function init() {
    gBalloons = [{ bottom: 0, speed: 2 }, { bottom: 0, speed: 5 }]
    // renderBalloons(gBalloons);
}



var intervalMoveBalloons = setInterval(function () {
    var elBalloons = document.querySelectorAll('.balloon');
    for (var i = 0; i < gBalloons.length; i++) {
        var balloon = gBalloons[i];
        balloon.bottom += balloon.speed;
        var elBalloon = elBalloons[i];
        elBalloon.style.bottom = balloon.bottom + 'px';
    }
}, 70)

function balloonClicked(elBalloon) {
    var audioPop = new Audio('sound/pop.mp3');
    audioPop.play();
    // elBalloon.style.display = 'none';
    elBalloon.style.opacity = '0';
    elBalloon.style.transition = 'opacity 1.5s';
}


