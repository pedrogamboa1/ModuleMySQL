const inquirer = require('inquirer');
const EmployeeQueries = require('./queries');

const employeeQueries = new EmployeeQueries();

async function startApp() {
  try {
    let answer;
    do {
      answer = await employeeQueries.startApp();
    } while (answer && answer.action !== 'Exit');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await employeeQueries.closeConnection();
  }
}

startApp();

