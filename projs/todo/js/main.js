'use strict'

// This is our controller it is responsible for rendering the view and action upon events
console.log('Todo');

function init() {
    createTodos();
    render();
}

function render() {
    renderTodos();
    renderStats();
}


function renderTodos() {
    var todos = getTodos();
    if (todos.length === 0) {
        var filterName = document.querySelector('#todo-filter');
        var filterHtmlStr = '';
    switch (filterName.value){
        case 'all':  filterHtmlStr = '';
        break;
        case 'active':  filterHtmlStr = 'Active';
        break;
        case 'done':  filterHtmlStr = 'Done';
        break;
    }
     document.querySelector('.todo-list').innerHTML = `No ${filterHtmlStr} Todos`
    }
    else {
        var strHtmls = todos.map(function (todo) {
            return `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onTodoClicked('${todo.id}')">
                   ${todo.txt}
                   <span class ="importance"> Importance: ${todo.importance} </span>
                   <span class = "time-stamp">Created at: ${timeStampToDate(todo.timeStamp)} </span>
                   <button class="btn-delete" onclick="onDeleteTodo('${todo.id}', event)">
                      &times;
                    </button>
                </li>`;
        })
        document.querySelector('.todo-list').innerHTML = strHtmls.join('')
    }
}

function renderStats() {
    document.querySelector('.todo-count').innerHTML = getTodoCount();
    document.querySelector('.active-count').innerHTML = getActiveCount();
}

function onTodoClicked(todoId) {
    toggleTodo(todoId);
    render();
}

function onSetFilter(statusFilter) {
    setFilter(statusFilter);
    render();
}

function onSortBy(value) {
    sortBy(value);
    render();
}

function onAddTodo() {
    var elNewTodoTxt = document.querySelector('#newTodoTxt');
    var newTodoTxt = elNewTodoTxt.value;
    if (newTodoTxt === '') return;
    addTodo(newTodoTxt);

    document.querySelector('h4').classList.add('animated', 'tada');
    setTimeout(function () {
        document.querySelector('h4').classList.remove('animated', 'tada');
    }, 1000)

    elNewTodoTxt.value = '';
    render()

}


function onDeleteTodo(todoId, ev) {
    if (!confirm('Are you sure?')) return;
    // Stop the propegation of the click event so the LI onclick will not trigger
    ev.stopPropagation();
    deleteTodo(todoId);
    render();
}