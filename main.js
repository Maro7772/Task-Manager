const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    const listItem = createTaskElement(task);
    taskList.appendChild(listItem);
  });
}

function saveTasks() {
  const tasks = Array.from(taskList.children).map(
    (listItem) => listItem.querySelector("span").textContent
  );
  // console.log(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(taskText) {
  const listItem = document.createElement("li");
  listItem.innerHTML = 
    `<span>${taskText}</span>
    <div class="actions">
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </div>`;

  const editButton = listItem.querySelector(".edit");
  const deleteButton = listItem.querySelector(".delete");

  editButton.addEventListener("click", () => editTask(listItem));
  deleteButton.addEventListener("click", () => deleteTask(listItem));

  return listItem;
}

function addTask() {
  const taskText = taskInput.value;
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }
  const listItem = createTaskElement(taskText);
  taskList.appendChild(listItem);
  taskInput.value = "";
  saveTasks();
}

function editTask(listItem) {
  const taskSpan = listItem.querySelector("span");
  const newTaskText = prompt("Edit task:", taskSpan.textContent);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    taskSpan.textContent = newTaskText.trim();
    saveTasks();
  }
}

function deleteTask(listItem) {
  taskList.removeChild(listItem);
  saveTasks();
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

window.addEventListener("load", loadTasks);
