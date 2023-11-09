const { createPool } = require('mysql2');

class Database {
  constructor() {
    this.pool = createPool({
      host: 'localhost',
      user: 'linkp69',
      password: 'Playa123',
      database: 'employeetracker'
    });
    this.pool.promise();
  }

  async query(sql, values) {
    try {
      const [results, fields] = await this.pool.promise().query(sql, values);
      return results;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async close() {
    await this.pool.end();
  }
}

module.exports = Database; 
