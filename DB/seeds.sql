INSERT INTO department
    (name) 
VALUES
    ("Accounting"),
    ("Finance"),
    ("Sales"),
    ("Engineering");

INSERT INTO role
    (title, salary, department_id) 
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2), 
    ('Software Engineer', 120000, 2),
    ('Accountant', 125000, 3), 
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);
        
INSERT INTO employee
    (first_name, last_name, role_id) 
VALUES
('John', 'Doe', 1),
('Mike', 'Chan', 1),
('Ashley', 'Rodriquez', 2),
('Kevin', 'Tupik', 2),
('Malia', 'Brown', 3),
('Sarah', 'Lourd', 3),
('Tom', 'Allen', 4);
