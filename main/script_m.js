const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const columns = document.querySelectorAll('.column');

// Add new task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const newTask = createTaskElement(taskText);
    document.querySelector('.column:nth-child(1)').appendChild(newTask);

    taskInput.value = ''; // Clear input
    saveTasksToLocalStorage(); // Save to local storage
});

// Create task element with edit/delete buttons
function createTaskElement(taskText) {
    const task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('draggable', 'true');
    task.textContent = taskText;

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
        const newTaskName = prompt('Edit task', taskText);
        if (newTaskName) {
            task.firstChild.textContent = newTaskName;
            saveTasksToLocalStorage(); // Save changes
        }
    });

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        task.remove();
        saveTasksToLocalStorage(); // Save changes
    });

    task.appendChild(editBtn);
    task.appendChild(deleteBtn);

    addDragAndDrop(task); // Make draggable
    return task;
}

// Drag-and-drop functionality
function addDragAndDrop(task) {
    task.addEventListener('dragstart', () => {
        task.classList.add('dragging');
    });

    task.addEventListener('dragend', () => {
        task.classList.remove('dragging');
        saveTasksToLocalStorage(); // Save positions
    });
}

// Allow dropping into columns
columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingTask = document.querySelector('.dragging');
        column.appendChild(draggingTask);
    });
});

// Save tasks to local storage
function saveTasksToLocalStorage() {
    const tasksData = [];
    columns.forEach(column => {
        const columnTasks = [];
        column.querySelectorAll('.task').forEach(task => {
            columnTasks.push(task.firstChild.textContent.trim());
        });
        tasksData.push(columnTasks);
    });
    localStorage.setItem('tasks', JSON.stringify(tasksData));
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasksData = JSON.parse(localStorage.getItem('tasks'));
    if (!tasksData) return;

    columns.forEach((column, index) => {
        column.innerHTML = `<h2>${column.querySelector('h2').textContent}</h2>`;
        tasksData[index].forEach(taskText => {
            const task = createTaskElement(taskText);
            column.appendChild(task);
        });
    });
}

// Load tasks on page load
window.addEventListener('load', loadTasksFromLocalStorage);
