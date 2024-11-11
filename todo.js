const STATUS = "TODO" || "DONE";

let todos = [];

// todo add
function addOne(newTodo) {
  todos.push(newTodo);
}

// status uurchluh :func
function editStatus(index, status) {
  let item = todos[index];
  item.status = status;
}

// Ner uurchilih :Func
function editName(index, name) {
  let item = todos[index];
  item.name = name;
  render();
}

//Todo delete one item
function deleteOne(index) {
  let arr = [];
  for (let i = 0; i < todos.length; i++) {
    if (i !== index) {
      arr.push(todos(i));
    }
  }
  todos = arr;
  render();
}

// todo delete all
function deleteAll() {
  todos = [];
  render();
}

// Count DONE
function countDone() {
  let count = 0;
  for (let i = 0; i < todos.length; i++) {
    let item = todos[i];
    if (item.status === "DONE") {
      count++;
    }
  }

  return count;
}

// RUNNING APPLICATION

function render() {
  const todolist = document.querySelector("#tasks");
  todolist.innerHTML = "";

  console.log(todolist);

  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];

    // create task item
    const element = document.createElement("div");
    element.classList.add("todo-item");

    //   create task name
    const titleEl = document.createElement("p");
    titleEl.innerText = item.name;

    //   create edit button
    const btnEl = document.createElement("button");
    btnEl.innerText = "Edit";
    btnEl.onclick = function () {
      const newName = prompt("Enter new name");
      editName(i, newName);
    };

    //   DELETE

    element.appendChild(titleEl);
    element.appendChild(btnEl);
    todolist.appendChild(element);
  }
}

function addTodo() {
  const imput = prompt("Enter todo name");
  addOne({ name: imput, status: "TODO" });
  render();
}
