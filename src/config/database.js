const sql = require('mssql');

const config = {
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  options: {
    encrypt: true, // For Azure SQL Database, set to true
  },
};





// Create a connection pool
const pool = new sql.ConnectionPool(config);

// Connect to the database
pool.connect()
  .then(() => {
    console.log('Connected to SQL Server');

    // You can perform database operations here

    // Don't forget to close the connection pool when done
   // pool.close();
  })
  .catch(err => {
    console.error('Error connecting to SQL Server:', err);
  });

module.exports = {pool}
