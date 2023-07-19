import './style.css';

let tasks = [
  { description: 'Task 1', completed: false, index: 1 },
  { description: 'Task 2', completed: false, index: 2 },
  { description: 'Task 3', completed: false, index: 3 },
];

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      toggleCompleted(index);
    });

    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = task.description;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.addEventListener('click', () => {
      deleteTask(index);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(descriptionSpan);
    listItem.appendChild(deleteButton);
    listItem.classList.add(task.completed ? 'completed' : 'uncompleted');
    taskList.appendChild(listItem);
  });
}

function addTask() {
  const taskInput = document.getElementById('task-input');
  const description = taskInput.value.trim();

  if (description !== '') {
    const newTask = {
      description,
      completed: false,
      index: tasks.length + 1,
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
  }
}

function deleteTask(index) {
  tasks = tasks.filter((task, i) => i !== index);
  renderTasks();
}

function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}

document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keypress', handleKeyPress);
document.getElementById('clear-completed-btn').addEventListener('click', clearCompletedTasks);
document.addEventListener('DOMContentLoaded', renderTasks);
