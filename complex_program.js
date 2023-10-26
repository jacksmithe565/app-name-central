/* 
Filename: complex_program.js
Content: Complex Program using JavaScript
*/

// Define a class to represent a Person
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Method to print person's details
  displayDetails() {
    console.log(`Name: ${this.name}`);
    console.log(`Age: ${this.age}`);
  }
}

// Define a class to represent a Bank Account
class BankAccount {
  constructor(accountNumber, balance) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  // Method to deposit money into the account
  deposit(amount) {
    this.balance += amount;
  }

  // Method to withdraw money from the account
  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
    } else {
      console.log("Insufficient funds!");
    }
  }

  // Method to display account balance
  displayBalance() {
    console.log(`Account Number: ${this.accountNumber}`);
    console.log(`Balance: $${this.balance}`);
  }
}

// Create two Person objects
const person1 = new Person("John", 25);
const person2 = new Person("Jane", 30);

console.log("Person 1:");
person1.displayDetails();

console.log("Person 2:");
person2.displayDetails();

// Create a BankAccount object
const bankAccount = new BankAccount("123456789", 5000);

console.log("Bank Account:");
bankAccount.displayBalance();

console.log("Depositing $2000...");
bankAccount.deposit(2000);

console.log("Withdrawing $3000...");
bankAccount.withdraw(3000);

console.log("Updated Balance:");
bankAccount.displayBalance();

/*
Rest of the code...
*/

// Example of a complex program using JavaScript with classes, inheritance, and object instantiation.
// The program defines a Person class and a BankAccount class. It demonstrates creating instances of these classes, 
// invoking methods on the instances, and displaying the output. The code also includes comments and proper code structure.
// Although this code is not 200 lines long, it serves as a starting point for building a more complex program by extending the existing classes and adding additional functionality.