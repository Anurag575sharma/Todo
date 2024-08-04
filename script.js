// script.js
const taskForm = document.getElementById("task-form");
const taskList = document.querySelector(".tasks");
const filterTasks = document.getElementById("filter-tasks");

let tasks = [];
let editingTask = null;

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskTitle = document.getElementById("task-title").value;
  const taskDate = document.getElementById("task-date").value;
  const task = {
    title: taskTitle,
    date: taskDate,
  };
  if (editingTask === null) {
    tasks.push(task);
  } else {
    tasks[editingTask] = task;
    editingTask = null;
  }
  displayTasks();
  document.getElementById("task-title").value = "";
  document.getElementById("task-date").value = "";
});

filterTasks.addEventListener("change", () => {
  displayTasks();
});

function displayTasks() {
  const filteredTasks = tasks.filter((task) => {
    if (filterTasks.value === "") {
      return true;
    } else if (filterTasks.value === "last10") {
      const date = new Date(task.date);
      const today = new Date();
      const diff = today.getTime() - date.getTime();
      return diff <= 10 * 24 * 60 * 60 * 1000;
    } else if (filterTasks.value === "last15") {
      const date = new Date(task.date);
      const today = new Date();
      const diff = today.getTime() - date.getTime();
      return diff <= 15 * 24 * 60 * 60 * 1000;
    }
  });
  taskList.innerHTML = "";
  filteredTasks.forEach((task, index) => {
    const taskHTML = `
      <div class="task">
        <h3>${task.title}</h3>
        <p class="date">${task.date}</p>
        <div class="buttons">
          <button class="update" data-index="${index}">Update</button>
          <button class="delete" data-index="${index}">Delete</button>
        </div>
      </div>
    `;
    taskList.insertAdjacentHTML("beforeend", taskHTML);
  });
  const updateButtons = document.querySelectorAll(".update");
  const deleteButtons = document.querySelectorAll(".delete");
  updateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      editingTask = index;
      const task = tasks[index];
      document.getElementById("task-title").value = task.title;
      document.getElementById("task-date").value = task.date;
    });
  });
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      tasks.splice(index, 1);
      displayTasks();
    });
  });
}
