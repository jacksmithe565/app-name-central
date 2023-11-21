/*
Filename: EmployeeManagementSystem.js

This code implements an Employee Management System that allows users to perform various operations such as adding, updating, and deleting employees, as well as searching and generating reports. The system uses classes, modules, and complex logic to provide a sophisticated solution for managing employees.
*/

// Import necessary modules
const readline = require('readline');

// Define Employee class
class Employee {
  constructor(id, name, age, salary) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.salary = salary;
  }
  
  getEmployeeInfo() {
    return `ID: ${this.id}, Name: ${this.name}, Age: ${this.age}, Salary: ${this.salary}`;
  }
}

// Define Employee Management System class
class EmployeeManagementSystem {
  constructor() {
    this.employees = [];
  }
  
  addEmployee(employee) {
    this.employees.push(employee);
  }
  
  updateEmployee(id, employee) {
    const index = this.findEmployeeIndexById(id);
    if (index !== -1) {
      this.employees[index] = employee;
    }
  }
  
  deleteEmployee(id) {
    const index = this.findEmployeeIndexById(id);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
  }
  
  findEmployeeIndexById(id) {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].id === id) {
        return i;
      }
    }
    return -1;
  }
  
  searchEmployeeByName(name) {
    const employees = [];
    for (let employee of this.employees) {
      if (employee.name.toLowerCase().includes(name.toLowerCase())) {
        employees.push(employee);
      }
    }
    return employees;
  }
  
  generateEmployeeReport() {
    let report = '';
    for (let employee of this.employees) {
      report += `${employee.getEmployeeInfo()}\n`;
    }
    return report;
  }
}

// Create an instance of EmployeeManagementSystem
const empManagementSystem = new EmployeeManagementSystem();

// Configure readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define main program loop
function mainLoop() {
  console.log("Employee Management System");
  console.log("--------------------------");
  console.log("1. Add Employee");
  console.log("2. Update Employee");
  console.log("3. Delete Employee");
  console.log("4. Search Employee by Name");
  console.log("5. Generate Employee Report");
  console.log("6. Exit");
  
  rl.question("Enter your choice (1-6): ", (choice) => {
    switch (choice) {
      case '1':
        addEmployee();
        break;
      case '2':
        updateEmployee();
        break;
      case '3':
        deleteEmployee();
        break;
      case '4':
        searchEmployee();
        break;
      case '5':
        generateReport();
        break;
      case '6':
        rl.close();
        return;
      default:
        console.log("Invalid choice! Please try again.");
    }
    
    mainLoop();
  });
}

function addEmployee() {
  rl.question("Enter employee ID: ", (id) => {
    rl.question("Enter employee name: ", (name) => {
      rl.question("Enter employee age: ", (age) => {
        rl.question("Enter employee salary: ", (salary) => {
          const employee = new Employee(id, name, age, salary);
          empManagementSystem.addEmployee(employee);
          console.log("Employee added successfully!");
        });
      });
    });
  });
}

function updateEmployee() {
  rl.question("Enter employee ID to update: ", (id) => {
    const index = empManagementSystem.findEmployeeIndexById(id);
    if (index !== -1) {
      rl.question("Enter new employee name: ", (name) => {
        rl.question("Enter new employee age: ", (age) => {
          rl.question("Enter new employee salary: ", (salary) => {
            const updatedEmployee = new Employee(id, name, age, salary);
            empManagementSystem.updateEmployee(id, updatedEmployee);
            console.log("Employee updated successfully!");
          });
        });
      });
    } else {
      console.log("Employee not found!");
    }
  });
}

function deleteEmployee() {
  rl.question("Enter employee ID to delete: ", (id) => {
    empManagementSystem.deleteEmployee(id);
    console.log("Employee deleted successfully!");
  });
}

function searchEmployee() {
  rl.question("Enter name to search employee: ", (name) => {
    const employees = empManagementSystem.searchEmployeeByName(name);
    for (let employee of employees) {
      console.log(employee.getEmployeeInfo());
    }
  });
}

function generateReport() {
  const report = empManagementSystem.generateEmployeeReport();
  console.log(report);
}

// Start the Employee Management System
mainLoop();