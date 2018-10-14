'use strict'

const KEY_USERS = 'users';
const KEY_LOGGEDINUSER =  'loggedinUser';
var gUsers;

function createUser(name, password, isAdmain) {
    return {
        username: name,
        password: password,
        lastLoginTime: Date.now(),
        isAdmain: isAdmain
    }
}

function createUsers(){
    var users = getFromStorage(KEY_USERS);
    gUsers = (users)? users : 
    [createUser('Muki', '1234', true),
    createUser('Shuki', 'aaa', false),
    createUser("puki", 'Aa1234', true)]
    saveUsers()
}

function saveUsers(){
    saveToStorage(KEY_USERS, gUsers)
}

function isLogin (username,password) {
    return gUsers.some (function (currUser){
       return (currUser.username === username && currUser.password === password);
    })
}

function doLogin(username){
    updateLoginTime(username);
    saveLogeedinToStorage(username);

}

function updateLoginTime(loggedinUsername){
     for (var i = 0; i < gUsers.length; i++) {
        if (gUsers[i].username === loggedinUsername) gUsers[i].lastLoginTime = Date.now()
     }
     saveToStorage(KEY_USERS, gUsers)
}


function saveLogeedinToStorage(username){
    var user =  gUsers.find (function (currUser){
        return (currUser.username === username);
    })
    saveToStorage(KEY_LOGGEDINUSER, user)
}

function logeedout(){
    localStorage.removeItem(KEY_LOGGEDINUSER)
}

function validateAdmin(){
    if (!isAdmain()) window.location.assign('index.html');
}

function sortBy(value){
    // debugger
    gUsers.sort(function(a, b){
        if (typeof a[value] === 'string') {
            var nameA=a[value].toLowerCase() , nameB=b[value].toLowerCase();
            if (nameA < nameB) 
                return -1 
            if (nameA > nameB)
                return 1
            return 0 
        }
        else return a[value]-b[value];
    })
   
}