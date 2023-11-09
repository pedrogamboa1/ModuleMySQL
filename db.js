const mysql = require('mysql2');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'linkp69',
      password: 'Playa123',
      database: 'employeetracker'
    });

    this.connection.promise();

    // Add event listener for connection errors
    this.connection.on('error', (err) => {
      console.error('MySQL Connection Error:', err);
    });
  }

  async query(sql, args) {
    try {
      const results = await this.connection.execute(sql, args);
      return results;
    } catch (err) {
      throw err;
    }
  }

  async close() {
    try {
      await this.connection.end();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Database;
