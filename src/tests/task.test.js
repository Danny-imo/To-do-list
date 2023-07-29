import { editTask, updateIndexes } from '../modules/todo.js';

jest.mock('../modules/todo', () => ({
  ...jest.requireActual('../modules/todo'),
  updateIndexes: jest.fn(),
}));

describe('Todo Functions', () => {
  describe('editTask', () => {
    test('Should succesfully edit selected task', () => {
      const listItem = document.createElement('li');
      const descriptionInput = document.createElement('input');
      listItem.appendChild(descriptionInput);
      const focusMock = jest.fn();
      descriptionInput.focus = focusMock;
      editTask(listItem, descriptionInput);
      expect(focusMock).toHaveBeenCalled();
    });
  });
  describe('updateIndexes', () => {
    test('should update the indexes of tasks', () => {
      const mockTasks = [
        { description: 'Task 1', completed: false, index: 1 },
        { description: 'Task 2', completed: true, index: 2 },
        { description: 'Task 3', completed: false, index: 3 },
      ];
      updateIndexes.mockReturnValue(mockTasks);
      const updatedTasks = updateIndexes(mockTasks);
      expect(updatedTasks).toEqual([
        { description: 'Task 1', completed: false, index: 1 },
        { description: 'Task 2', completed: true, index: 2 },
        { description: 'Task 3', completed: false, index: 3 },
      ]);
    });
  });

  describe('clearCompletedTasks', () => {
    test('it should remove completed tasks from the tasks array and the DOM', () => {
      const initialTasks = [
        { description: 'Task 1', completed: true, index: 1 },
        { description: 'Task 2', completed: true, index: 2 },
        { description: 'Task 3', completed: true, index: 3 },
      ];
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      expect(tasks).toHaveLength(3);
    });
  });
});