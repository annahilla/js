// DOM Elements
let taskInput = document.getElementById('taskInput');
let taskList = document.getElementById('taskList');
let highPriority = document.getElementById('high');
let mediumPriority = document.getElementById('medium');
let lowPriority = document.getElementById('low');
let workCategory = document.getElementById('work');
let personalCategory = document.getElementById('personal');
let errandsCategory = document.getElementById('errands');
let workList = document.getElementById('workList');
let personalList = document.getElementById('personalList');
let errandsList = document.getElementById('errandsList');
let emptyWork = document.getElementById('emptyWork');
let emptyPersonal = document.getElementById('emptyPersonal');
let emptyErrands = document.getElementById('emptyErrands');
let empties = document.querySelectorAll('.empty-task-item');
let draggedTask;

// Event Listeners
taskInput.addEventListener('keypress', addTask);

// Task function
function addTask(event) {
    if (event.key === "Enter") {
        let task = document.createElement('div');
        task.classList.add('task-item');
        task.setAttribute('draggable', 'true');
        task.innerHTML = `
            <div class="task-value">
            <p>${taskInput.value}<p>
            <small></small>
            <i id="remove" class="remove-btn fa-solid fa-xmark"></i>
            </div>
        `;

        let priorityTag = task.querySelector('small');
        let removeBtn = task.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => task.remove());

        if (workCategory.checked) {
            workList.insertBefore(task, emptyWork);

        } else if (personalCategory.checked) {
            personalList.insertBefore(task, emptyPersonal);

        } else if (errandsCategory.checked) {
            errandsList.insertBefore(task, emptyErrands);
        }

        if (highPriority.checked) {
            priorityTag.innerHTML = "High Priority";
            priorityTag.style.backgroundColor = 'red';
        } else if (mediumPriority.checked) {
            priorityTag.innerHTML = "Medium Priority";
        } else if (lowPriority.checked) {
            priorityTag.innerHTML = "Low Priority";
            priorityTag.style.backgroundColor = 'green';
        }
        taskInput.value = '';
        taskItem = task;

        // Attach drag and drop event listeners to new task
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragend', dragEnd);
    }
}

// Loop through empties
for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

// Drag Functions
function dragStart() {
    draggedTask = this;
    setTimeout(() => this.className = 'invisible', 0);
}

function dragEnd() {
    this.className = 'task-item';
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className = 'hovered-task-item';
}

function dragLeave() {
    this.className = 'empty-task-item';
}

function dragDrop() {
    this.className = 'empty-task-item';
    this.parentElement.insertBefore(draggedTask, this);
}
