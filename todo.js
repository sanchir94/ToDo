let taskToEdit = null;

function openModal(task = null) {
  document.getElementById("modal").style.display = "block";
  const modalTitle = document.querySelector("#modal-content > h2");

  if (task) {
    modalTitle.innerText = "Edit task";
    document.getElementById("text").value =
      task.querySelector(".task-name").innerText;
    document.getElementById("status").value = task.dataset.status;
    taskToEdit = task;
  } else {
    modalTitle.innerText = "Add task";
    taskToEdit = null;
    document.getElementById("text").value = "";
    document.getElementById("status").value = "todo";
  }
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function submitTask() {
  const taskName = document.getElementById("text").value;
  const taskStatus = document.getElementById("status").value;

  if (taskToEdit) {
    taskToEdit.querySelector(".task-name").innerText = taskName;
    const oldStatus = taskToEdit.dataset.status;
    taskToEdit.dataset.status = taskStatus;

    moveTaskToNewStatus(taskToEdit, oldStatus, taskStatus);
  } else {
    addTask(taskName, taskStatus);
  }

  closeModal();
}

function addTask(taskName, taskStatus) {
  if (!taskName) return;

  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");
  taskCard.dataset.status = taskStatus;
  taskCard.setAttribute("draggable", true);
  taskCard.innerHTML = `
    <span class="task-name">${taskName}</span>
    <div class="task-actions">
      <button class="edit-btn">
        <img src="edit.png" alt="Edit">
      </button>
      <button class="delete-btn">
        <img src="delete.png" alt="Delete">
      </button>
    </div>
  `;

  taskCard
    .querySelector(".edit-btn")
    .addEventListener("click", () => openModal(taskCard));
  taskCard
    .querySelector(".delete-btn")
    .addEventListener("click", () => deleteTask(taskCard));

  taskCard.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("taskId", taskCard.dataset.status);
  });

  const taskContainer = document.getElementById(`task-list-${taskStatus}`);
  taskContainer.appendChild(taskCard);
  updateTaskCount();
}

function deleteTask(taskCard) {
  const status = taskCard.dataset.status;
  taskCard.remove();
  updateTaskCount();
}

function moveTaskToNewStatus(taskCard, oldStatus, newStatus) {
  const oldContainer = document.getElementById(`task-list-${oldStatus}`);
  oldContainer.removeChild(taskCard);

  const newContainer = document.getElementById(`task-list-${newStatus}`);
  newContainer.appendChild(taskCard);

  updateTaskCount();
}

function updateTaskCount() {
  const statuses = ["todo", "in-progress", "done", "blocked"];
  statuses.forEach((status) => {
    const taskContainer = document.getElementById(`task-list-${status}`);
    const num = taskContainer ? taskContainer.children.length : 0;
    document.getElementById(`num-${status}`).innerText = num;
  });
}

function allowDrop(e) {
  e.preventDefault();
}

function drop(e, newStatus) {
  e.preventDefault();
  const taskId = e.dataTransfer.getData("taskId");
  const taskCard = document.querySelector(`[data-status="${taskId}"]`);
  taskCard.dataset.status = newStatus;
  moveTaskToNewStatus(taskCard, taskId, newStatus);
}
