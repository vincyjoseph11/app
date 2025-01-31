document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearAllBtn = document.getElementById('clearAllBtn');

    // Add Task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        } else {
            alert('Please enter a task!');
        }
    });

    // Function to Add Task
    function addTask(taskText) {
        const li = document.createElement('li');
        li.setAttribute('data-status', 'pending'); // Default task status

        li.innerHTML = `
            <span>${taskText}</span>
            <div class="action-btns">
                <button class="edit-btn">
                    <img src="images/pen.icon.png" alt="Edit">
                </button>
                <button class="delete-btn">
                    <img src="images/trash-can.png" alt="Delete">
                </button>
            </div>
        `;

        // Mark task as completed on click
        li.querySelector('span').addEventListener('click', () => {
            li.querySelector('span').classList.toggle('completed');
            li.setAttribute('data-status',
                li.querySelector('span').classList.contains('completed') ? 'completed' : 'pending'
            );
        });

        // Edit Task
        li.querySelector('.edit-btn').addEventListener('click', () => {
            const newTaskText = prompt('Edit your task:', taskText);
            if (newTaskText) {
                li.querySelector('span').textContent = newTaskText;
            }
        });

        // Delete Task
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
        });

        taskList.appendChild(li);
    }

    // Filter Tasks
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.id;

            filterTasks(filter);
        });
    });

    function filterTasks(filter) {
        const tasks = taskList.querySelectorAll('li');

        tasks.forEach(task => {
            switch (filter) {
                case 'allTasksBtn':
                    task.style.display = 'flex';
                    break;
                case 'completedTasksBtn':
                    task.style.display = task.getAttribute('data-status') === 'completed' ? 'flex' : 'none';
                    break;
                case 'pendingTasksBtn':
                    task.style.display = task.getAttribute('data-status') === 'pending' ? 'flex' : 'none';
                    break;
            }
        });
    }

    // Clear All Tasks
    clearAllBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all tasks?')) {
            taskList.innerHTML = '';
        }
    });
});