import { addTask, deleteTask } from '../modules/todo.js';

document.body.innerHTML = `
  <ul id="task-list">
    <!-- Your existing todo list items will be here -->
  </ul>
`;

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Todo Functions', () => {
  describe('addTask', () => {
    test('it should add a new task to the tasks array and the DOM', () => {
      document.body.innerHTML = `
        <input type="text" id="task-input" value="New Task">
        <ul id="task-list"></ul>
      `;

      addTask();

      const tasks = JSON.parse(localStorage.getItem('tasks'));

      // Get the task-list element from the DOM
      const taskList = document.getElementById('task-list');

      // Assert that the tasks array is updated
      expect(tasks).toHaveLength(1);

      // Assert that the DOM contains the new task <li> element
      expect(taskList.children).toHaveLength(1);
    });
  });

  describe('deleteTask', () => {
    test('it should remove a task from the tasks array and the DOM', () => {
      // Mock initial tasks in localStorage
      const initialTasks = [
        { description: 'Task 1', completed: false, index: 1 },
        { description: 'Task 2', completed: false, index: 2 },
      ];
      localStorage.setItem('tasks', JSON.stringify(initialTasks));

      // Call the deleteTask function to delete the first task (index 0)
      deleteTask(0);

      // Get the updated tasks from localStorage
      const tasks = JSON.parse(localStorage.getItem('tasks'));

      // Assert that the tasks array is updated and the first task is removed
      expect(tasks).toHaveLength(0);
    });
  });
});
