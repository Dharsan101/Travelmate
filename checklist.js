// ======================================
// PACKING CHECKLIST
// ======================================

const taskInput = document.getElementById("taskInput");

const taskList = document.getElementById("taskList");

// Load Saved Tasks
window.addEventListener("load", loadTasks);

function addTask() {

    const task = taskInput.value.trim();

    if (task === "") {

        alert("Enter an item");

        return;

    }

    createTask(task);

    saveTask(task);

    taskInput.value = "";

}

// Create Task
function createTask(task) {

    const li = document.createElement("li");

    li.innerHTML = `

        ${task}

        <button class="deleteBtn">❌</button>

    `;

    taskList.appendChild(li);

    li.querySelector(".deleteBtn").addEventListener("click", () => {

        li.remove();

        deleteTask(task);

    });

}

// Save Local Storage
function saveTask(task) {

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// Load Tasks
function loadTasks() {

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => createTask(task));

}

// Delete Task
function deleteTask(task) {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.filter(t => t !== task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

}