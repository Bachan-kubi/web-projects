const tasks = document.getElementById('tasks');
const todoForm = document.getElementById('todo-form');
const todoLists = document.getElementById('todoLists');

function displayTask(e) {
    e.preventDefault();
    const task = tasks.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.textContent = task;
        todoLists.appendChild(li);
        tasks.value = '';
    }
}

todoForm.addEventListener('submit', displayTask);


