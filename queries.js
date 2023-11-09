const inquirer = require('inquirer');
const Database = require('./db');

class EmployeeQueries {
  constructor() {
    this.db =  new Database();
  }

  async startApp() {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ]);

    switch (answer.action) {
      case 'View all departments':
        await this.viewDepartments();
        break;
      case 'View all roles':
        await this.viewRoles();
        break;
      case 'View all employees':
        await this.viewEmployees();
        break;
      case 'Add a department':
        await this.addDepartment();
        break;
      case 'Add a role':
        await this.addRole();
        break;
      case 'Add an employee':
        await this.addEmployee();
        break;
      case 'Update an employee role':
        await this.updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Exiting the application.');
        await this.db.close();
        break;
    }
  }

  async viewDepartments() {
    const results = await this.db.query('SELECT * FROM department');
    console.log(results);
    await this.startApp();
  }
  

  async viewRoles() {
    const results = await this.db.query('SELECT * FROM role');
    console.table(results);
    await this.startApp();
  }

  async viewEmployees() {
    const results = await this.db.query('SELECT * FROM employee');
    console.table(results);
    await this.startApp();
  }

  async addDepartment() {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:'
      }
    ]);

    await this.db.query('INSERT INTO department (name) VALUES (?)', [answer.name]);
    console.log('Department added successfully.');
    await this.startApp();
  }

  async addRole() {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:'
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the role:'
      }
    ]);

    await this.db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answer.title, answer.salary, answer.departmentId]);
    console.log('Role added successfully.');
    await this.startApp();
  }

  async addEmployee() {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:'
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the role ID for the employee:'
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'Enter the manager ID for the employee (or leave blank if none):'
      }
    ]);

    await this.db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.firstName, answer.lastName, answer.roleId, answer.managerId || null]);
    console.log('Employee added successfully.');
    await this.startApp();
  }

  async updateEmployeeRole() {
    const employees = await this.db.query('SELECT * FROM employee');
    const roles = await this.db.query('SELECT * FROM role');

    const employeeChoices = employees.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }));

    const roleChoices = roles.map(role => ({
      name: role.title,
      value: role.id
    }));

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee to update:',
        choices: employeeChoices
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the new role for the employee:',
        choices: roleChoices
      }
    ]);

    await this.db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.roleId, answer.employeeId]);
    console.log('Employee role updated successfully.');
    await this.startApp();
  }
}

module.exports = EmployeeQueries;
