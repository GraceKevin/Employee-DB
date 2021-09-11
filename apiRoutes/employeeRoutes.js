const inquirer = require('inquirer');
const mysql = require('mysql2');

inquirer.prompt (
    {
        name: 'action',
        type: 'list',
        message: 'Main menu select',
        choices: 
        [
            'View Departments',
            'View Roles',
            'View Employees',
            'Add Department',
            'Add Role',
            'Add Employee'
        ]
    }
);