# Test Cases - PHP React Employee Management System

This document contains manual test cases for the PHP React Employee Management System.

## Test Environment

- Backend: PHP
- Frontend: React
- Database: MariaDB
- Browser: Google Chrome
- Test Type: Manual Testing / Functional Testing

---

## Login Test Cases

### TC-LOGIN-001: Login with valid admin credentials

**Precondition:**  
Admin user exists in the database.

**Test Data:**  
Username: admin  
Password: 123456

**Test Steps:**
1. Open the login page.
2. Enter username `admin`.
3. Enter password `123456`.
4. Click the Login button.

**Expected Result:**  
User is logged in successfully and redirected to the Employee Management page.

**Status:** Passed

---

### TC-LOGIN-002: Login with invalid password

**Precondition:**  
Admin user exists in the database.

**Test Data:**  
Username: admin  
Password: wrongpassword

**Test Steps:**
1. Open the login page.
2. Enter username `admin`.
3. Enter wrong password.
4. Click the Login button.

**Expected Result:**  
An error message is displayed: `Benutzername oder Passwort falsch`.

**Status:** Passed

---

### TC-LOGIN-003: Login with empty fields

**Precondition:**  
User is on the login page.

**Test Steps:**
1. Leave username empty.
2. Leave password empty.
3. Click the Login button.

**Expected Result:**  
A validation message is displayed asking the user to enter username or password.

**Status:** Passed

---

## Logout Test Cases

### TC-LOGOUT-001: Logout after successful login

**Precondition:**  
User is logged in.

**Test Steps:**
1. Click the Logout button.

**Expected Result:**  
User is logged out and redirected to the login page.

**Status:** Passed

---

## Employee CRUD Test Cases

### TC-EMP-001: Add new employee

**Precondition:**  
User is logged in.

**Test Data:**  
First Name: Max  
Last Name: Mustermann  
Email: max@example.com

**Test Steps:**
1. Enter first name.
2. Enter last name.
3. Enter email.
4. Click `Mitarbeiter speichern`.

**Expected Result:**  
New employee is saved and displayed in the employee list.

**Status:** Passed

---

### TC-EMP-002: Add employee with empty fields

**Precondition:**  
User is logged in.

**Test Steps:**
1. Leave all employee form fields empty.
2. Click `Mitarbeiter speichern`.

**Expected Result:**  
A validation message is displayed and employee is not saved.

**Status:** Passed

---

### TC-EMP-003: Add employee with invalid email

**Precondition:**  
User is logged in.

**Test Data:**  
First Name: Max  
Last Name: Mustermann  
Email: maxexample.com

**Test Steps:**
1. Enter first name.
2. Enter last name.
3. Enter invalid email without `@`.
4. Click `Mitarbeiter speichern`.

**Expected Result:**  
A validation message is displayed: `Bitte eine gültige E-Mail eingeben`.

**Status:** Passed

---

### TC-EMP-004: Edit employee

**Precondition:**  
Employee exists in the employee list.

**Test Steps:**
1. Click `Bearbeiten` on an employee.
2. Change first name, last name or email.
3. Click `Änderungen speichern`.

**Expected Result:**  
Employee data is updated successfully and the updated data is shown in the list.

**Status:** Passed

---

### TC-EMP-005: Delete employee

**Precondition:**  
Employee exists in the employee list.

**Test Steps:**
1. Click `Löschen` on an employee.
2. Confirm the browser confirmation dialog.

**Expected Result:**  
Employee is deleted and removed from the employee list.

**Status:** Passed

---

## Search Test Cases

### TC-SEARCH-001: Search employee by name

**Precondition:**  
Employees exist in the list.

**Test Steps:**
1. Enter an employee name in the search field.

**Expected Result:**  
Only employees matching the search text are displayed.

**Status:** Passed

---

### TC-SEARCH-002: Search employee by email

**Precondition:**  
Employees exist in the list.

**Test Steps:**
1. Enter an employee email in the search field.

**Expected Result:**  
Only employees matching the email are displayed.

**Status:** Passed

---

### TC-SEARCH-003: Search employee by ID

**Precondition:**  
Employees exist in the list.

**Test Steps:**
1. Enter an employee ID in the search field.

**Expected Result:**  
Only the employee with the matching ID is displayed.

**Status:** Passed

---

### TC-SEARCH-004: Search with no result

**Precondition:**  
User is logged in.

**Test Steps:**
1. Enter a search text that does not match any employee.

**Expected Result:**  
Message is displayed: `Keine Mitarbeiter gefunden`.

**Status:** Passed

---

## Pagination Test Cases

### TC-PAGE-001: Show five employees per page

**Precondition:**  
More than five employees exist.

**Test Steps:**
1. Open Employee Management page.
2. Check employee list.

**Expected Result:**  
Only five employees are displayed on one page.

**Status:** Passed

---

### TC-PAGE-002: Navigate to next page

**Precondition:**  
More than five employees exist.

**Test Steps:**
1. Click the Next button.

**Expected Result:**  
The next set of employees is displayed.

**Status:** Passed

---

### TC-PAGE-003: Navigate to previous page

**Precondition:**  
User is on page 2 or higher.

**Test Steps:**
1. Click the Previous button.

**Expected Result:**  
The previous set of employees is displayed.

**Status:** Passed

---

## User Role Test Cases

### TC-USER-001: Admin can add new user

**Precondition:**  
Admin user is logged in.

**Test Steps:**
1. Enter new username.
2. Enter new password.
3. Select role.
4. Click `Benutzer speichern`.

**Expected Result:**  
New user is created successfully.

**Status:** Passed

---

### TC-USER-002: Duplicate username is not allowed

**Precondition:**  
A user with the same username already exists.

**Test Steps:**
1. Enter an existing username.
2. Enter password.
3. Click `Benutzer speichern`.

**Expected Result:**  
Message is displayed: `Benutzername existiert bereits`.

**Status:** Passed

---

### TC-USER-003: Normal user cannot see add-user form

**Precondition:**  
User with role `user` is logged in.

**Test Steps:**
1. Login with a normal user account.

**Expected Result:**  
The form `Neuen Benutzer hinzufügen` is not visible.

**Status:** Passed

---

## Backend Error Handling Test Cases

### TC-ERROR-001: Backend is not reachable

**Precondition:**  
Frontend is running and backend server is stopped.

**Test Steps:**
1. Open the React application.
2. Try to login or load employees.

**Expected Result:**  
Message is displayed: `Backend ist nicht erreichbar`.

**Status:** Passed