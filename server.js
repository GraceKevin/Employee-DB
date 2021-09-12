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
                'add department',
                'add role',
                'add employee',
                'update employee role'
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
            // add department
            if (options === 'add department') {
                addDepartment();
            }
            // add role
            if (options === 'add role') {
                addRole();
            }
            // add employee
            if (options === 'add employee') {
                addEmployee();
            }
            // update  employee
            if (options === 'update employee role'){
                updateEmployee();
            }
        });
};

// View Departments
const viewDepartment = () => {
    let sql = `SELECT * FROM department`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        questions();
    });
};

// View Roles
const viewRoles = () => {
    let sql = `SELECT role.id,
                                                roles.title,
                                                department.name AS department
                                                FROM roles
                                                INNER JOIN department ON roles.department_id = department.id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        questions();
    });
};

// View Employee
const viewEmployee = () => {
    let sql = `SELECT employee.id,
                                                employee.first_name,
                                                employee.last_name,
                                                roles.title,
                                                department.name AS department,
                                                roles.salary,
                                                CONCAT (manager.first_name, ' ', manager.last_name) AS manager
                                                FROM employee
                                                LEFT JOIN roles ON employee.role_id = roles.id
                                                LEFT JOIN department ON role.department_id = department.id
                                                LEFT JOIN employee manager ON employee.manager_id = manager.id
                                                GROUP BY employee.id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        questions();
    });
};

// Add Department
const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'What is the department? (Required)',
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                }
                else {
                    console.log('Please enter a department name.');
                    return false;
                }
            }
        }
    ]) .then ((newDepartment) => {
        let sql = `INSERT INTO department (name) VALUES (?)`;

        connection.query(sql, [newDepartment.addDept], (err, res) => {
            if (err) throw err;
            console.table(res);
            viewDepartment();
        });
    });
};

// Add Roles
const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the new role? (Required)',
            validate: roleInput => {
                if (roleInput) {
                    return true;
                }
                else {
                    console.log('Please enter the role');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department ID? (Required)',
            validate: department_ID_Input => {
                if (department_ID_Input) {
                    return true
                }
                else {
                    console.log ('Please include the department ID');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the new role? (Required)',
            validate: salaryInput => {
                if (salaryInput) {
                    return true
                }
                else {
                    console.log ('Please include the salary for the role');
                    return false;
                }
            }
        }
    ]) .then((createdRole) => {
        let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        connection.query(sql, [createdRole.newRole, createdRole.salary, createdRole.department_id], (err, res) => {
            if (err) throw err;
            console.table(res);
            viewRoles();
        });
    });
};

// Add Employee
const addEmployee = () => {
	return inquirer.prompt([
		{
			type: 'input',
			name: 'firstName',
			message: 'What is the employees first name? (Required)',
			validate: nameInput => {
				if (nameInput) {
					return true;
				} 
                else {
					console.log('Please include the employees first name.');
					return false;
				}
			}
    },
      {
        type: 'input',
        name: 'lastName',
        message: 'What is the employees last name? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } 
          else {
            console.log('Please include the employees last name');
            return false;
          }
        }
      },
	  {
        type: 'number',
        name: 'roleID',
        message: 'What is the role ID for this employee? (Required)',
        validate: idRoleInput => {
          if (idRoleInput) {
            return true;
          } 
          else {
            console.log('You must provide the employees role ID!');
            return false;
          }
        }
      },
      {
        type: 'number',
        name: 'managerID',
        message: 'What is the managers ID for this employee? (Required)',
        validate: managerInput => {
          if (managerInput) {
            return true;
          } 
          else {
            console.log('Please include the managers ID for the employee.');
            return false;
          }
        }
      }
    ])
		.then((newEmployee) => {
			let sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)`;

			connection.query(sql, [newEmployee.firstName, newEmployee.lastName, newEmployee.roleID, newEmployee.managerID], (err, res) => {
				if (err) throw err;
				console.table(res);
				viewEmployees();
			});
		});
};

// Update Roles
const updateRole = () => {
	return inquirer.prompt([
		{
			type: 'input',
			name: 'firstName',
			message: 'What is the first name of the employee? (Required)',
			validate: nameInput => {
				if (nameInput) {
					return true;
				} 
                else {
					console.log('Please include the employees first name.');
					return false;
        }
      }
    },
    {
			type: 'input',
			name: 'lastName',
			message: 'What is the last name of the employee? (Required)',
			validate: nameInput => {
				if (nameInput) {
					return true;
				} 
                else {
					console.log('Please include the employees last name');
					return false;
        }
      }
    },
    {
			type: 'number',
			name: 'roleID',
			message: 'What is the new role ID of the employee? (Required)',
			validate: newRoleID => {
				if (newRoleID) {
					return true;
				} 
                else {
					console.log('Please include the new rold ID for the employee.');
					return false;
        }
      }
    }
  ]) .then((updateEmpRole) => {
    let sql = `UPDATE employee SET roles_id = ? WHERE first_name = ? AND last_name = ?`;

    connection.query(sql, [updateEmpRole.roleID, updateEmpRole.firstName, updateEmpRole.lastName], (err, res) => {
      if (err) throw err;
      console.table(res);
      viewEmployees();
    });
  });
};