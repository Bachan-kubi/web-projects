class Task {
    constructor(name) {
        this.name = name;
        this.completed = false;
    }

    toggle() {
        this.completed = !this.completed;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
        this.taskListEl = document.getElementById('taskList');
        this.inputEl = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');

        this.addBtn.addEventListener('click', () => this.addTask());
        this.render();
    }

    addTask() {
        const taskName = this.inputEl.value.trim();
        if (taskName) {
            const task = new Task(taskName);
            this.tasks.push(task);
            this.inputEl.value = '';
            this.render();
        }
    }

    toggleTask(index) {
        this.tasks[index].toggle();
        this.render();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.render();
    }

    render() {
        this.taskListEl.innerHTML = '';
        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span onclick="taskManager.toggleTask(${index})">${task.name}</span>
                <button onclick="taskManager.deleteTask(${index})">❌</button>
            `;
            this.taskListEl.appendChild(li);
        });
    }
}

const taskManager = new TaskManager();
