'use strict'



function getFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}


function isAdmain() {
    var currUser = getFromStorage(KEY_LOGGEDINUSER);
    if (currUser === null) return false;
    else return currUser.isAdmain;
}

function renderObjsTable(objs) {

    var elTbody = document.querySelector('tbody');
    var strTh = '<tr>';
    var keys = Object.keys(objs[0]);
    keys.forEach(function (currKey) {
        strTh += '<th>' + currKey + '</th>';
    })
    strTh += '</tr>'
    elTbody.innerHTML = strTh;
    objs.forEach(function (currObj) {
        var strTr = '<tr>';
        for (var x in currObj) {
            if (x === 'lastLoginTime') {
                strTr += '<td>' + timeStampToDate(currObj[x]) + '</td>'
            }
            else strTr += '<td>' + currObj[x] + '</td>';
        }
        strTr += '</tr>'
        elTbody.innerHTML += strTr;
    })
}

function timeStampToDate(timeStamp) {
    var currentdate = new Date(timeStamp);
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " ,    "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes()
        + ":" + currentdate.getSeconds();
    return datetime;
}