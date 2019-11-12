
// Create function to add Item
function addItem(item) {
  const todoList = document.querySelector('.todo-list');
  const list = document.createElement('div');
  list.className = 'list';
  list.innerHTML = `
    <p>${item}</p>
    <div class="icon-remove">
      <svg class="trash" enable-background="new 0 0 48 48" height="48px" version="1.1" viewBox="0 0 48 48" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Expanded"><g><g><path d="M41,48H7V7h34V48z M9,46h30V9H9V46z"/></g><g><path d="M35,9H13V1h22V9z M15,7h18V3H15V7z"/></g><g><path d="M16,41c-0.553,0-1-0.447-1-1V15c0-0.553,0.447-1,1-1s1,0.447,1,1v25C17,40.553,16.553,41,16,41z"/></g><g><path d="M24,41c-0.553,0-1-0.447-1-1V15c0-0.553,0.447-1,1-1s1,0.447,1,1v25C25,40.553,24.553,41,24,41z"/></g><g><path d="M32,41c-0.553,0-1-0.447-1-1V15c0-0.553,0.447-1,1-1s1,0.447,1,1v25C33,40.553,32.553,41,32,41z"/></g><g><rect height="2" width="48" y="7"/></g></g></g></svg>
    </div>
  `;

  todoList.appendChild(list);  
}

// show item from localStorage
let tasks = JSON.parse(localStorage.tasks);
tasks.map((item) => {
  addItem(item);
});


class Task {
  constructor(todo) {
    this.todo = todo;
  }
}

class UI {
  addTask(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task.todo);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    addItem(task.todo);
  }

  resetInput() {
    document.querySelector('.input').value = "";
  }

  showmessage(message, className) {
  
    const todoBox = document.querySelector('.todo-box');
    let formTask = document.querySelector('.form-task');
    let element = document.createElement('div');
    element.className = `message ${className}`;
    element.innerHTML = `
      <p>${message}</p>
    `;

    todoBox.insertBefore(element, formTask);


    setTimeout(() => {
      todoBox.removeChild(element);      
    }, 3000);
  }

  deleteTask(element) {
    if(element.className.baseVal === 'trash') {
      // element.parentElement.parentElement.style.display = "none";
      let tasks = JSON.parse(localStorage.tasks);
      tasks.forEach((item) => {
        if(item == element.parentElement.parentElement.innerText) {
          
        }
      });
    }
  }
}

document.querySelector('.form-task').addEventListener('submit', (e) => {
  e.preventDefault();
  
  let input = document.querySelector('.input').value;
  
  const task = new Task(input);

  const ui = new UI();
  
  if(input == "") {
    ui.showmessage("Please type something!", "red");
  } else {
    ui.addTask(task);
    ui.showmessage("New todo has been added successfully", "green");
    ui.resetInput();
  }
});

document.querySelector('.todo-list').addEventListener('click', (e) => {
  const ui = new UI();
  ui.deleteTask(e.target);
  ui.showmessage("task has been remove successfully", "yellow")
});