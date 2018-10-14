'use strict'

const KEY_TODOS = 'todos';

var gTodos;
var gTodosFilter = 'all';

function createTodos() {
    var todos = getFromStorage(KEY_TODOS);
    gTodos = (todos)? todos : [createTodo('Learn HTML'), createTodo('Practice CSS')] 
}
function createTodo(txt) {
    return {
        id: makeId(),
        txt: txt,
        timeStamp: Date.now(),
        importance: setImportance(),
        isDone: false
    }
}

function getTodos() {
    return gTodos.filter(function(todo){
        return gTodosFilter === 'all' || 
               (gTodosFilter === 'done' && todo.isDone) ||
               (gTodosFilter === 'active' && !todo.isDone)
    });
}


function addTodo(todoTxt) {
    gTodos.unshift(createTodo(todoTxt));
    saveToStorage(KEY_TODOS, gTodos);

}


function toggleTodo(todoId) {
    var todo = gTodos.find(function(todo){
        return todo.id === todoId
    });
    todo.isDone = !todo.isDone;
    saveToStorage(KEY_TODOS, gTodos);
}

function setFilter(statusFilter) {
    gTodosFilter = statusFilter;
}

function sortBy(value){
    debugger
    gTodos.sort(function(a, b){
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

function deleteTodo(todoId) {
    var todoIdx = gTodos.findIndex(function(todo){
        return todo.id === todoId;
    })
    gTodos.splice(todoIdx, 1);
    saveToStorage(KEY_TODOS, gTodos);
}

function getTodoCount() {
    return gTodos.length;
}
function getActiveCount() {
    return gTodos.filter(function(todo){
        return !todo.isDone
    }).length
}

