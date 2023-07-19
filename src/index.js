import './style.css';
import {
  renderTasks, addTask, clearCompletedTasks, handleKeyPress,
} from './modules/todo.js';

document.addEventListener('DOMContentLoaded', renderTasks);

document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keypress', handleKeyPress);
document.getElementById('clear-completed-btn').addEventListener('click', clearCompletedTasks);
