let todoList = [];
displayTask();
function addTodo() {
  let todoElement = document.querySelector("#todo-input");
  let todoDate = document.querySelector("#item-date");
  let todoItem = todoElement.value;
  let todoTime = todoDate.value;
  todoList.push({ item: todoItem, dueDate: todoTime });
  todoElement.value = "";
  todoDate.value = "";

  displayTask();
}

function displayTask() {
  let displayElement = document.querySelector(".container-items");
  let newHtml = "";
  for (let i = 0; i < todoList.length; i++) {
    let { item, dueDate } = todoList[i];
    if (item === "" && dueDate == "") {
      continue;
    } // skip empty items and undefined dates
    newHtml += `
    <span>${item} 
      </span>
      <span>${dueDate} 
      </span> <button id="todo-delete" onclick="todoList.splice(${i},1); displayTask()">Delete</button>`;
  }
  displayElement.innerHTML = newHtml;
}
