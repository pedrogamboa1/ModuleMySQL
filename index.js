const EmployeeQueries = require('./queries');

const employeeQueries = new EmployeeQueries();

async function startApp() {
  try {
    await employeeQueries.startApp();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await employeeQueries.closeConnection();
  }
}

startApp();
