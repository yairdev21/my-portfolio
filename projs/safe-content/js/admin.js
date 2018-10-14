'use strict'




function initAdmin() {
    validateAdmin();
    createUsers()
    renderObjsTable(gUsers);
}

function onSortBy(value) {
    sortBy(value);
    renderObjsTable(gUsers);
}