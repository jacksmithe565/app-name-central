/*

Filename: SophisticatedCode.js

This code is a comprehensive implementation of a web-based task management system.
It provides functionality for creating, assigning, updating, and completing tasks,
as well as filtering and sorting tasks based on different criteria.

Please note that the code provided here is a simplified version and should be built upon
and tailored to suit specific project requirements.

*/

// Task class to represent individual tasks
class Task {
  constructor(title, description, assignee, dueDate, completed) {
    this.title = title;
    this.description = description;
    this.assignee = assignee;
    this.dueDate = dueDate;
    this.completed = completed;
  }
}

// TaskManager class to manage tasks
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  // Method to add a new task
  addTask(title, description, assignee, dueDate) {
    const newTask = new Task(title, description, assignee, dueDate, false);
    this.tasks.push(newTask);
  }

  // Method to update an existing task
  updateTask(taskIndex, title, description, assignee, dueDate, completed) {
    const task = this.tasks[taskIndex];
    if (task) {
      task.title = title;
      task.description = description;
      task.assignee = assignee;
      task.dueDate = dueDate;
      task.completed = completed;
    }
  }

  // Method to remove a task
  removeTask(taskIndex) {
    if (taskIndex >= 0 && taskIndex < this.tasks.length) {
      this.tasks.splice(taskIndex, 1);
    }
  }

  // Method to mark a task as completed
  completeTask(taskIndex) {
    const task = this.tasks[taskIndex];
    if (task) {
      task.completed = true;
    }
  }

  // Method to filter tasks by assignee
  filterByAssignee(assignee) {
    return this.tasks.filter((task) => task.assignee === assignee);
  }

  // Method to sort tasks by due date
  sortByDueDate() {
    return this.tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  // Method to generate HTML representation of tasks
  generateHtml() {
    let html = "";
    this.tasks.forEach((task) => {
      const taskHtml = `
        <div class="task">
          <h2>${task.title}</h2>
          <p>${task.description}</p>
          <p>Assignee: ${task.assignee}</p>
          <p>Due Date: ${task.dueDate}</p>
          <p>Status: ${task.completed ? "Completed" : "Incomplete"}</p>
        </div>
      `;
      html += taskHtml;
    });
    return html;
  }
}

// Example usage
const taskManager = new TaskManager();

taskManager.addTask("Task 1", "Description 1", "John Doe", "2022-01-01");
taskManager.addTask("Task 2", "Description 2", "Jane Smith", "2022-02-01");
taskManager.addTask("Task 3", "Description 3", "John Doe", "2022-03-01");

taskManager.updateTask(0, "Updated Task 1", "Updated Description 1", "John Doe", "2022-02-01", false);

taskManager.completeTask(1);

const filteredTasks = taskManager.filterByAssignee("John Doe");
const sortedTasks = taskManager.sortByDueDate();

console.log(taskManager.generateHtml());