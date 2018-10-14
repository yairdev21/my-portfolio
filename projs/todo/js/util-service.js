'use strict'

function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function setImportance() {
    return document.getElementById('importance').value;
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


function getFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}