const form = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoContainer = document.getElementById('todo-container');

let allTodos = getTodos();


form.addEventListener('submit', function (e) {
    e.preventDefault();
    addTodo();
});
function addTodo() {
    const todoText = todoInput.value.trim();
    if(todoText.length>0){
        const todoObj = {
            text: todoText,
            completed: false
        }
    allTodos.push(todoObj);
    updateTodo();
    saveTodos();
    todoInput.value = "";
    } else{
        return alert('Enter your lists');
    }
}
function updateTodo() {
    todoContainer.innerHTML = "";
    allTodos.forEach((item, index)=>{
        console.log(item, index);
        let todoItem = createTodoItem(item, index);
        todoContainer.append(todoItem);
    })
}
function createTodoItem(todoText, index){
    console.log(todoText);
    const todoId = "todo-"+index;
    const todoLi = document.createElement("li");
    let todoTxt = todoText.text;
    todoLi.className = "todo";
    todoLi.innerHTML= `
        <li class="todo">
            <input type="checkbox" id="${todoId}" />
            <label for="${todoId}" class="custom-checkbox">
              <svg fill="transparent"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path
                  d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
                />
              </svg>
            </label>
            <label class="todo-text" for="${todoId}"> ${todoTxt}</label>
            <button class="delete-button">
              <svg fill="var(--secondary-color)" 
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path
                  d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                />
              </svg>
            </button>
          </li>
    `
    const dltBtn = todoLi.querySelector('.delete-button');
    console.log(dltBtn);
    dltBtn.addEventListener('click', ()=>{
        deleteTodoItem(index);
    });
    const checkbox = todoLi.querySelector("input");
    checkbox.addEventListener('change', ()=>{
        allTodos[index].completed = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = todoText.completed;
    console.log(todoText.completed, todoText.text);
    return todoLi;
}
function  deleteTodoItem(index) {
    allTodos = allTodos.filter((_, i)=>i!== index);
    saveTodos();
    updateTodo();
}
function saveTodos() {
    const todoJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todoJson)
}
function getTodos() {
    const getJsonTodo = localStorage.getItem('todos') || "[]";
    return JSON.parse(getJsonTodo);
}
updateTodo();