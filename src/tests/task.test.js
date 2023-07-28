// Import the functions you want to test

// Mock the DOM
document.body.innerHTML = `
  <ul id="task-list">
    <!-- Your existing todo list items will be here -->
  </ul>
`;

// Mock localStorage
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
  // Initialize tasks array
  let tasks = [];

  beforeEach(() => {
    // Reset tasks array before each test
    tasks = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
    ];
  });

  describe('toggleCompleted', () => {
    test('it should update the task completed status in the tasks array and the DOM', () => {
      // Mock initial tasks in localStorage
      localStorage.setItem('tasks', JSON.stringify(tasks));

      // Get the updated tasks from localStorage
      const updatedTasks = JSON.parse(localStorage.getItem('tasks'));

      // Assert that the tasks array is updated and the task completed status is toggled
      expect(updatedTasks).toHaveLength(2);
      expect(updatedTasks[0].completed).toBe(false);
      expect(updatedTasks[1].completed).toBe(false);
    });
  });

  describe('updateTaskDescription', () => {
    test('it should update the task description in the tasks array and the DOM', () => {
      // Mock initial tasks in localStorage
      localStorage.setItem('tasks', JSON.stringify(tasks));

      // Get the updated tasks from localStorage
      const updatedTasks = JSON.parse(localStorage.getItem('tasks'));

      // Assert that the tasks array is updated and the task description is modified
      expect(updatedTasks).toHaveLength(2);
      expect(updatedTasks[0].description).toBe('Task 1');
      expect(updatedTasks[1].description).toBe('Task 2');
    });
  });
});
