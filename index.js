class TodoList {
  constructor() {
    this.taskTitleInput = document.querySelector('#taskTitle');
    this.taskContentInput = document.getElementById('taskContent');
    this.saveBtn = document.getElementById('saveBtn');
    this.listGroup = document.querySelector('.list-group');
    this.todos = [];

    this.saveBtn.addEventListener('click', this.handleSaveClick.bind(this));
    this.listGroup.addEventListener('click', this.handleRemoveClick.bind(this));

    this.displayTodos();
  }

  createElement(taskTitle, taskContent) {
    const newListItem = document.createElement('li');
    newListItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    newListItem.innerHTML = `
      <span class="task-title">${taskTitle}</span>
      <span class="task-content">${taskContent}</span>
      <i class="fa-solid fa-trash-can"></i>`;
    this.listGroup.appendChild(newListItem);
    this.todos.push({ taskTitle, taskContent });
    console.log(this.todos);
  }

  displayTodos() {
    const storedTodos = this.getFromLocalStorage();
    storedTodos.forEach((todo) => {
      this.createElement(todo.taskTitle, todo.taskContent);
    });
  }

  handleRemoveClick(e) {
    if (e.target.classList.contains('fa-trash-can')) {
      const listItem = e.target.closest('li');
      const taskTitle = listItem.querySelector('.task-title').textContent;
      const taskContent = listItem.querySelector('.task-content').textContent;

      listItem.remove();
      this.removeTodoFromLocalStorage(taskTitle, taskContent);
    }
  }

  handleSaveClick(e) {
    e.preventDefault();
    const taskTitle = this.taskTitleInput.value;
    const taskContent = this.taskContentInput.value;
    this.createElement(taskTitle, taskContent);
    this.saveTodoToLocalStorage(taskTitle, taskContent);

    this.taskTitleInput.value = '';
    this.taskContentInput.value = '';
  }

  removeTodoFromLocalStorage(taskTitle, taskContent) {
    const storedTodos = this.getFromLocalStorage();
    const updatedTodos = storedTodos.filter((todo) => {
      return todo.taskTitle !== taskTitle || todo.taskContent !== taskContent;
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  getFromLocalStorage(localStorageKey = 'todos') {
    return JSON.parse(localStorage.getItem(localStorageKey)) || [];
  }

  saveTodoToLocalStorage(taskTitle, taskContent) {
    const storedTodos = this.getFromLocalStorage();
    const updatedTodos = [...storedTodos, { taskTitle, taskContent }];
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }
}

const todoList = new TodoList();


