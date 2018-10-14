'use strict'

function init(){
    createUsers()
}

function onIsLogin(){
    var elNewUsername= document.querySelector('#name-input');
    var newUserName = elNewUsername.value;
    var elNewPassword = document.querySelector('#password-input');
    var newPassword = elNewPassword.value;
    if (isLogin(newUserName,newPassword)){
    document.querySelector('.modal').classList.add('modal-closed');
    var elHeader = document.querySelector('h2');
    elHeader.innerHTML = `Welcome,  ${newUserName} !`;
    doLogin(newUserName);
    saveLogeedinToStorage(newUserName);
    showAdminLink();
  
    }
}

function onIsLogout(){
    document.querySelector('.modal').classList.remove('modal-closed');
    document.querySelector('#name-input').value = '';
    document.querySelector('#password-input').value = '';
    logeedout();
}

function showAdminLink(){
    var elAdminLink = document.querySelector('.admin-link');
    if (isAdmain()) elAdminLink.innerHTML = '<a href="admin.html">admin.html</a>';
    else elAdminLink.innerHTML = '';
}

function onSortBy(value) {
    sortBy(value);
    render();
}