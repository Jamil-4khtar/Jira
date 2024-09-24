const tasks = document.querySelectorAll('.task');
const columns = document.querySelectorAll('.column');

// Add dragstart and dragend events to tasks
tasks.forEach(task => {
    task.addEventListener('dragstart', () => {
        task.classList.add('dragging');
    });

    task.addEventListener('dragend', () => {
        task.classList.remove('dragging');
    });
});

// Allow tasks to be dropped into columns
columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingTask = document.querySelector('.dragging');
        column.appendChild(draggingTask);
    });
});
