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
            <small class="priority"></small>
            <i id="remove" class="remove-btn fa-solid fa-xmark"></i>
            </div>
        `;

        let priorityTag = task.querySelector('.priority');
        let removeBtn = task.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => task.remove());

        if (workCategory.checked) {
            workList.insertBefore(task, emptyWork);

        } else if (personalCategory.checked) {
            personalList.insertBefore(task, emptyPersonal);

        } else if (errandsCategory.checked) {
            errandsList.insertBefore(task, emptyErrands);
        }

        //Priorities
        if (highPriority.checked) {
            priorityTag.innerHTML = "High Priority";
            priorityTag.style.backgroundColor = 'red';
            priorityTag.classList.add('highPriorityChecked');
        } else if (mediumPriority.checked) {
            priorityTag.innerHTML = "Medium Priority";
            priorityTag.classList.add('mediumPriorityChecked');
        } else if (lowPriority.checked) {
            priorityTag.innerHTML = "Low Priority";
            priorityTag.style.backgroundColor = 'green';
            priorityTag.classList.add('lowPriorityChecked');
        }

        taskInput.value = '';
        taskItem = task;

        //Priority Config
        priorityTag.addEventListener('click', (e) => {
            console.log(123);
            if (e.target.innerHTML === 'Low Priority') {
                priorityTag.innerHTML = 'Medium Priority';
                priorityTag.style.backgroundColor = '';
                priorityTag.classList.remove('lowPriorityChecked');
                priorityTag.classList.add('mediumPriorityChecked');
            } else if (e.target.innerHTML === 'Medium Priority') {
                priorityTag.innerHTML = 'High Priority';
                priorityTag.style.backgroundColor = 'red';
                priorityTag.classList.remove('mediumPriorityChecked');
                priorityTag.classList.add('highPriorityChecked');
            } else if (e.target.innerHTML === 'High Priority') {
                priorityTag.innerHTML = 'Low Priority';
                priorityTag.style.backgroundColor = 'green';
                priorityTag.classList.remove('highPriorityChecked');
                priorityTag.classList.add('lowPriorityChecked');
            }
        })

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
