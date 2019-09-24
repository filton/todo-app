let todoList = [];

window.onload = function () {
    const retrievedTodoList = localStorage.getItem('todoList');

    if (retrievedTodoList) {
        try {
            todoList = JSON.parse(retrievedTodoList);
            generateTodoList();
        } catch (ex) {
            console.error('Parsing from local storage failed!', ex);
        }
    }
}

const input = document.getElementById('new-task-input');
input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTodo();
    }
});

function addTodo() {
    const taskText = document.getElementById('new-task-input').value;

    if (!taskText) {
        alert('Please enter a value for the task!');
        return;
    } else if (todoList && todoList.map(i => i.value).includes(taskText)) {
        alert('Task with the same name is already in the list!');
        return;
    }

    const newTask = {
        value: taskText,
        isComplete: false
    };

    todoList.push(newTask);
    console.log('current todo list:', todoList);

    generateTodoList();
    saveTodoList();

    document.getElementById('new-task-input').value = '';
}

function generateTodoList() {
    let listHtml = '';

    todoList.forEach(
        (todo, index) => {
            listHtml += `
                <li class="todo-item" id="todo-item-${index}">
                    <input type="checkbox" class="cb-todo" ${todo.isComplete ? 'checked' : ''} onchange="changeTodoStatus(${index})">
                    <span class="todo-item-text${todo.isComplete ? ' is-complete' : ''}">${todo.value}</span>
                    <button id="delete-todo-${index}" onclick="deleteTodo(${index})">Delete</button>
                </li>          
            `;
        }
    );

    document.getElementById('todoList').innerHTML = listHtml;
}

function changeTodoStatus(index) {
    todoList[index].isComplete = !todoList[index].isComplete;

    generateTodoList();
    saveTodoList();
}

function deleteTodo(index) {
    todoList.splice(index, 1);
    generateTodoList();
    saveTodoList();
}

function saveTodoList() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
