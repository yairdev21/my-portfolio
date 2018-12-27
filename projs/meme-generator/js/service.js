'use strict'

var gImgs;
var gMeme = {
    selectedImgId: undefined,
    txts: [
        {
            line: '',
            fontSize: 45,
            lineY: 0,
            lineYRange: [],
            lineX: 0,
            lineXRange: [],
            fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
            align: 'center',
            fillColor: '#FFFFFF',
            strokeColor: '#000000',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            isSelected: false
        }
    ]
}
var gCategoryCountMap = {
    happy: 3,
    sad: 2,
    animal: 1,
    funny: 5,
    bad: 4,
}

var gKeyWords = ['All','Animal','Sad','Happy','Crazy','Sarcastic']




function setCategoriesForStorgae() {
    var keys = Object.keys(gCategoryCountMap)
    var vals = Object.values(gCategoryCountMap)
    for (var i = 0; i < keys.length; i++) {
        saveToStorage(keys[i], vals[i])
    }
}


function getAllStorage() {
    if (jQuery.isEmptyObject(gCategoryCountMap)) return false ;
    else {
        var values = []
        var keys = Object.keys(localStorage);
        for (let i = 0; i < keys.length; i++) {
            var currKey = keys[i];
            var currVal = localStorage.getItem(keys[i]);
            var currKeyVal = [currKey, currVal]
            values.push(currKeyVal);
        }
        return values;
    }
}


function createImgs() {

    var imgs = [
        { id: '001', url: 'img/001.jpg', keywords: ['All', 'Happy'] },
        { id: '002', url: 'img/002.jpg', keywords: ['All', 'Crazy'] },
        { id: '003', url: 'img/003.jpg', keywords: ['All', 'Happy'] },
        { id: '004', url: 'img/004.jpg', keywords: ['All', 'Animal'] },
        { id: '005', url: 'img/005.jpg', keywords: ['All', 'Happy', 'Animal'] },
        { id: '006', url: 'img/006.jpg', keywords: ['All', 'Happy', 'Animal'] },
        { id: '007', url: 'img/007.jpg', keywords: ['All', 'Sarcastic'] },
        { id: '008', url: 'img/008.jpg', keywords: ['All', 'Happy'] },
        { id: '009', url: 'img/009.jpg', keywords: ['All', 'Sarcastic'] },
        { id: '010', url: 'img/010.jpg', keywords: ['All', 'Sarcastic'] },
        { id: '011', url: 'img/011.jpg', keywords: ['All', 'Happy', 'Crazy'] },
        { id: '012', url: 'img/012.jpg', keywords: ['All', 'Happy', 'Sarcastic'] },
        { id: '013', url: 'img/013.jpg', keywords: ['All', 'Sad'] },
        { id: '014', url: 'img/014.jpg', keywords: ['All', 'Happy'] },
        { id: '015', url: 'img/015.jpg', keywords: ['All', 'Happy'] },
        { id: '016', url: 'img/016.jpg', keywords: ['All', 'Happy'] },
        { id: '017', url: 'img/017.jpg', keywords: ['All', 'Animal'] },
        { id: '018', url: 'img/018.jpg', keywords: ['All', 'Crazy'] },
        { id: '019', url: 'img/019.jpg', keywords: ['All', 'Sad'] },
        { id: '020', url: 'img/020.jpg', keywords: ['All', 'Sarcastic'] },
        { id: '021', url: 'img/021.jpg', keywords: ['All', 'Sarcastic'] },
        { id: '022', url: 'img/022.jpg', keywords: ['All', 'Happy'] },
        { id: '023', url: 'img/023.jpg', keywords: ['All', 'Crazy'] },
        { id: '024', url: 'img/024.jpg', keywords: ['All', 'Happy'] },
        { id: '025', url: 'img/025.jpg', keywords: ['All', 'Sad'] },
    ]
    gImgs = imgs;
}


function getImgs() {
    var currCategoryKey = ($('.category-filter').val()).toLowerCase().trim()
    if (currCategoryKey === '') return gImgs;
    else {
        var currCategoryCount = getFromStorage(currCategoryKey)
        gCategoryCountMap[currCategoryKey] = currCategoryCount + 1;
        saveToStorage(currCategoryKey, gCategoryCountMap[currCategoryKey])
        return gImgs.filter(currImg => {
            return (currImg.keywords.some(keyWord => {
                return keyWord.toLowerCase() === currCategoryKey
            }))
        })
    }
}

function setMemeByImgId(imgId) {
    gCurrImg = gImgs.find(img => {
        return (+(img.id) === imgId);
    })
    gMeme.selectedImgId = gCurrImg.id;
}

function getMeme() {
    return gMeme;
}

function addText(txtLoc, value) {
    gMeme.txts[txtLoc].line = value;
}


function addShadow(currTxtLoc) {
    var currTxt = gMeme.txts[currTxtLoc];
    currTxt.shadowOffsetX = 5
    currTxt.shadowOffsetY = 5
    currTxt.shadowBlur = 1
    currTxt.shadowColor = 'rgba(0,0,0,0.4)'
}

function cancelShadow(currTxtLoc) {
    var currTxt = gMeme.txts[currTxtLoc];
    currTxt.shadowOffsetX = 5
    currTxt.shadowOffsetY = 5
    currTxt.shadowBlur = 1
    currTxt.shadowColor = 'rgba(0,0,0,0)'
}

function changeFillColor(color, currTxtLoc) {
    var currTxt = gMeme.txts[currTxtLoc];
    currTxt.fillColor = color;
}

function changeStrokeColor(color, currTxtLoc) {
    var currTxt = gMeme.txts[currTxtLoc];
    currTxt.strokeColor = color;
}

function changeFontSize(fontSizeNum, currTxtLoc) {
    var currTxt = gMeme.txts[currTxtLoc];
    currTxt.fontSize += fontSizeNum;
}



function getOffset() {
    var left = gCanvas.offsetLeft;
    var top = gCanvas.offsetTop;
    return { left, top }
}


function initFirstLine() {
    if (!gMeme.txts[0].lineX) {
        for (var i = 0; i < gMeme.txts.length; i++) {
            var txt = gMeme.txts[i]

            // init line x
            var fontFactor = 0.5;
            txt.lineX = gCanvas.width / 2
            txt.lineXRange = [
                txt.lineX - (txt.line.length * txt.fontSize * fontFactor) / 2,
                txt.lineX + (txt.line.length * txt.fontSize * fontFactor) / 2
            ]

            // init line Y
            var factor = 1
            if (i === 1) var factor = 4
            txt.lineY = gCanvas.height * factor / 5
            txt.lineYRange = [
                txt.lineY - txt.fontSize,
                txt.lineY
            ]

        }
    }
}

function updateX(xDiff) {
    var txt = gMeme.txts[gCurrTxtLoc]
    if (xDiff) txt.lineX += xDiff

    var fontFactor = 0.5;
    txt.lineXRange = [
        txt.lineX - (txt.line.length * txt.fontSize * fontFactor) / 2,
        txt.lineX + (txt.line.length * txt.fontSize * fontFactor) / 2
    ]
}

function updateY(yDiff) {
    var txt = gMeme.txts[gCurrTxtLoc]
    if (yDiff) txt.lineY += yDiff
    txt.lineYRange = [
        txt.lineY - txt.fontSize,
        txt.lineY
    ]
}


function createNewText(loc) {
    if (loc === 'center') {
        var lineY = gCanvas.height / 2;
    } else {
        var lineY = gCanvas.height * 4 / 5;
    }
    gMeme.txts.push({
        line: 'new line',
        fontSize: 45,
        lineY,
        lineYRange: [],
        lineX: gCanvas.width / 2,
        lineXRange: [],
        fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
        align: 'center',
        fillColor: '#FFFFFF',
        strokeColor: '#000000',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        shadowColor: 'rgba(0,0,0,0)',
        isSelected: false
    })
    var newLineIdx = gMeme.txts.length - 1;
    initNewLine(newLineIdx)
}



function initNewLine(line) {
    var txt = gMeme.txts[line]
    var fontFactor = 0.5;
    txt.lineXRange = [
        txt.lineX - (txt.line.length * txt.fontSize * fontFactor) / 2,
        txt.lineX + (txt.line.length * txt.fontSize * fontFactor) / 2
    ]
    txt.lineYRange = [
        txt.lineY - txt.fontSize,
        txt.lineY
    ]

}

function deleteText(idx) {
    gMeme.txts.splice(idx, 1)
}

function initCaption() {
    document.querySelector('.caption').value = 'new line'
}


function listenToEnter() {
    var elCaption = document.querySelector('.caption')
    elCaption.addEventListener('keypress', function (ev) {
        var key = ev.which || e.keyCode;
        if (key === 13) { 
          renderCanvas()
        }
    });
}