const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'abc123',
  database: 'mern'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');
});

const createTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    file VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Projects table created');
  });
};

createTable();

module.exports = db;

