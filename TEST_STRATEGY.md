# Test Strategy - PHP React Employee Management System

This document describes the basic test strategy for the PHP React Employee Management System.

The goal is to verify that the main application features work correctly and that errors are handled in a clear and user-friendly way.

## Test Objectives

- Verify that users can log in and log out successfully.
- Verify that employee CRUD operations work correctly.
- Verify that form validation prevents invalid data.
- Verify that admin and user roles behave correctly.
- Verify that search and pagination work as expected.
- Verify that important workflows are covered by Selenium E2E tests.
- Verify that backend errors are handled clearly in the frontend.

## Test Scope

The following areas are included in testing:

- Login and logout
- Employee create, read, update and delete
- User creation by admin
- Admin and user roles
- Search by ID, name and email
- Pagination
- Form validation
- Backend error handling
- Selenium UI automation

## Test Levels

### 1. Manual Testing

Manual testing is used to check the application from the user perspective.

Examples:

- Login with valid credentials
- Login with invalid credentials
- Add, edit and delete employees
- Search employees by name, email and ID
- Check admin and user role behavior

### 2. Functional Testing

Functional testing checks whether each feature works according to the expected result.

Main tested functions:

- Authentication
- Employee management
- User management
- Search
- Pagination
- Validation
- Error handling

### 3. Negative Testing

Negative testing checks how the system behaves with invalid input or wrong actions.

Examples:

- Login with wrong password
- Submit empty employee form
- Enter invalid email address
- Create duplicate username
- Use the frontend when the backend is not reachable

### 4. End-to-End Testing with Selenium

Selenium WebDriver is used to automate important user workflows in the browser.

Automated test coverage:

- Login page is visible
- Successful login
- Employee create, update and delete workflow

### 5. Regression Testing

Regression testing is used after changes to make sure existing features still work.

Before pushing changes to GitHub, the following checks should be done:

- Run the backend
- Run the frontend
- Run Selenium tests with `npm test`
- Check the main CRUD workflow manually

## Test Data

Default admin user:

```text
username: admin
password: 123456
```

Example employee test data:

```text
First Name: Selenium
Last Name: Test
Email: selenium@test.com
```

## Test Tools

- Google Chrome
- Selenium WebDriver
- Node.js
- React
- PHP
- MariaDB
- Git and GitHub

## Entry Criteria

Testing can start when:

- Backend server is running.
- Frontend server is running.
- Database is available.
- Test user exists.
- Required test data is prepared.

## Exit Criteria

Testing is considered successful when:

- Login and logout work correctly.
- Employee CRUD operations work correctly.
- Validation messages are displayed correctly.
- Admin and user roles behave correctly.
- Selenium tests pass successfully.
- No critical errors are found.