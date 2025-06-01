const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function  renderTodo() {
    if(taskInput.value ===""){
        alert('Please input task first!')
    } else{
        let li = document.createElement("li");
        li.innerHTML = taskInput.value;
        taskList.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "X";
        li.appendChild(span);
    }
    taskInput.value = "";        
}
function chck(e) {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle('checked')
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
}


taskList.addEventListener("click", chck, false);
addBtn.addEventListener('click', renderTodo);