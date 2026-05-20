# PHP React Employee Management System

A full-stack Employee Management System built with PHP, React, and MariaDB.

This project was created as a learning project to practice full-stack development, CRUD operations, authentication, roles, and automated UI testing with Selenium.

## Technologies Used

### Backend
- PHP
- MariaDB / MySQL
- MySQLi
- Prepared Statements
- password_hash / password_verify

### Frontend
- React
- Vite
- JavaScript
- CSS

### Testing
- Selenium WebDriver
- Node.js

## Features

- Login and Logout
- Password hashing
- Admin and user roles
- Add new users from React
- Only admin can add users
- Create employees
- Read employees
- Update employees
- Delete employees
- Search employees by ID, name, or email
- Pagination with 5 employees per page
- Form validation
- Loading state
- Backend error handling
- Automated Selenium UI tests

## Project Structure

```text
php-react-employee-management
│
├── backend
│   ├── index.php
│   └── db.php
│
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
└── selenium-tests
    ├── login-test.js
    ├── login-success-test.js
    ├── employee-crud-test.js
    ├── run-all-tests.js
    └── package.json
```

## Database Setup

Create a database:

```sql
CREATE DATABASE php_react_employee_db;
```

Create employees table:

```sql
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL
);
```

Create users table:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user'
);
```

Create an admin user.

First generate a password hash with PHP:

```powershell
C:\xampp\php\php.exe -r "echo password_hash('123456', PASSWORD_DEFAULT);"
```

Then insert the admin user:

```sql
INSERT INTO users (username, password, role)
VALUES ('admin', 'PASTE_HASH_HERE', 'admin');
```

## Backend Setup

Open a terminal inside the backend folder:

```powershell
cd backend
```

Start the PHP server:

```powershell
C:\xampp\php\php.exe -S localhost:8000
```

Backend URL:

```text
http://localhost:8000
```

## Frontend Setup

Open a terminal inside the frontend folder:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start React:

```powershell
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

or sometimes:

```text
http://localhost:5174
```

## Test Login

Default admin user:

```text
username: admin
password: 123456
```

## Selenium Tests

Open a terminal inside the selenium-tests folder:

```powershell
cd selenium-tests
```

Install dependencies:

```powershell
npm install
```

Run all Selenium tests:

```powershell
npm test
```

The tests include:

- Login page test
- Successful login test
- Employee CRUD test

## Important Notes

Before running Selenium tests, make sure both servers are running.

Backend:

```text
http://localhost:8000
```

Frontend:

```text
http://localhost:5174
```

If your frontend runs on a different port, update the port inside the Selenium test files.

## Learning Goals

This project helped practice:

- Building a PHP backend API
- Connecting React with PHP
- Working with MariaDB
- Creating CRUD operations
- Using prepared statements
- Hashing passwords
- Managing login with localStorage
- Creating admin and user roles
- Writing Selenium UI tests