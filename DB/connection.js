const mysql = require ('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    // Your MYSQL username
    user: 'root',
    // Your MYSQL password
    password: '',
    database: 'employee'
});

module.exports = db;