-- Select the database
USE EmployeeTracker;

-- Add seeding data for departments
INSERT INTO department (name) VALUES
  ('HR'),
  ('IT'),
  ('Marketing'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

-- Add seeding data for roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Manager', 80000, 1),  -- Assuming 'HR' department has id 1
  ('Software Engineer', 90000, 4),  -- Assuming 'Engineering' department has id 4
  ('Marketing Specialist', 75000, 3);  -- Assuming 'Marketing' department has id 3

-- Add seeding data for employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),  -- Manager, no manager
  ('Alice', 'Smith', 2, 1),  -- Software Engineer, managed by John Doe
  ('Bob', 'Johnson', 3, 1);  -- Marketing Specialist, managed by John Doe
