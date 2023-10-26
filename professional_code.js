// filename: professional_code.js
// This code demonstrates a sophisticated, elaborate, and complex implementation of a task management system in JavaScript.

// Define class for tasks
class Task {
  constructor(id, name, description, priority, deadline, status) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.deadline = deadline;
    this.status = status;
  }

  updateStatus(newStatus) {
    this.status = newStatus;
  }
}

// Define class for task manager
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(id, name, description, priority, deadline, status) {
    const task = new Task(id, name, description, priority, deadline, status);
    this.tasks.push(task);
  }

  getTaskById(id) {
    for (const task of this.tasks) {
      if (task.id === id) {
        return task;
      }
    }
    return null;
  }

  getTasksByPriority(priority) {
    return this.tasks.filter(task => task.priority === priority);
  }

  getTasksByStatus(status) {
    return this.tasks.filter(task => task.status === status);
  }

  updateTaskStatus(id, newStatus) {
    const task = this.getTaskById(id);
    if (task) {
      task.updateStatus(newStatus);
      return true;
    }
    return false;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index > -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
}

// Create an instance of TaskManager
const taskManager = new TaskManager();

// Add tasks
taskManager.addTask(1, "Complete Project", "Finish the coding", "High", "2022-10-31", "Open");
taskManager.addTask(2, "Test Application", "Run various tests", "Medium", "2022-11-15", "Open");
taskManager.addTask(3, "Update Documentation", "Update user manual", "Low", "2022-11-30", "Open");
taskManager.addTask(4, "Fix Bugs", "Resolve reported issues", "High", "2022-12-10", "Open");

// Get tasks by priority
const highPriorityTasks = taskManager.getTasksByPriority("High");
console.log("High Priority Tasks:");
console.log(highPriorityTasks);

// Get tasks by status
const openTasks = taskManager.getTasksByStatus("Open");
console.log("Open Tasks:");
console.log(openTasks);

// Update task status
const taskId = 1;
const newStatus = "In Progress";
const isUpdated = taskManager.updateTaskStatus(taskId, newStatus);
console.log(`Task ${taskId} status updated: ${isUpdated}`);

// Delete task
const deleteTaskId = 3;
const isDeleted = taskManager.deleteTask(deleteTaskId);
console.log(`Task ${deleteTaskId} deleted: ${isDeleted}`);

// Display remaining tasks
console.log("Remaining Tasks:");
console.log(taskManager.tasks);