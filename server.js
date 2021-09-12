const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
// const db = require('./db/connection');
const consoleTable = require('console.table');
// update routes
//const apiRoutes = require('./routes/apiRoutes');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'K3v1n137',
    database: 'employees'
});

connection.connect((err) => {
    // if (err) throw err;
    questions();
})

const questions =  () => {
    return inquirer.prompt([
        {
            type: 'list', 
            name: 'options',
            message: 'Welcome to you Employee Database. Please select what you would like to do.',
            choices: 
            [
                'view departments',
                'view roles',
                'view employees',
            ]
        }])
        .then((userInput) => {
            const { options } = userInput;
            // to view departments
            if (options === 'view departments') {
                viewDepartment();
            }
            // to view roles
            if (options === 'view roles') {
                viewRoles();
            }
            // to view employees
            if (options === 'view employees') {
                viewEmployee();
            }
        });
};

// View Departments
const viewDepartment = () => {
    const sql = `SELECT * FROM department`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        questions();
    });
};

const viewRoles = () => {
    const sql = `SELECT role.id,
                                                role.title,
                                                department.name AS department
                                                FROM role
                                                INNER JOIN department ON role.department_id = department.id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        questions();
    });
};

const viewEmployee = () => {
    const sql = `SELECT employee.id,
                                                employee.first_name,
                                                employee.last_name,
                                                role.title,
                                                department.name AS department,
                                                role.salary,
                                                CONCAT (manager.first_name, ' ', manager.last_name) AS manager
                                                FROM employee
                                                LEFT JOIN role ON employee.role_id = role.id
                                                LEFT JOIN department ON role.department_id = department.id
                                                LEFT JOIN employee manager ON employee.manager_id = manager.id
                                                GROUP BY employee.id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        questions();
    });
};