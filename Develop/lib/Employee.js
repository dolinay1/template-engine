// TODO: Write code to define and export the Employee class

class Employee {
    constructor(id, email) {
      this.id = id;
      this.email = email;
    }
  
    printInfo() {
      for (var key in this) {
        console.log(`${key}: ${this[key]}`);
      }
    }
  }


  module.exports = Employee;