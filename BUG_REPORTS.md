# Bug Reports - PHP React Employee Management System

This document contains example bug reports for the PHP React Employee Management System.

The goal of this document is to practice structured bug reporting as part of software testing and quality assurance.

## Bug Report Template

Each bug report should include:

- Bug ID
- Title
- Environment
- Precondition
- Steps to Reproduce
- Expected Result
- Actual Result
- Severity
- Priority
- Status
- Notes

---

## BUG-001: Backend server is not reachable during login

**Environment:**  
Windows 11, Google Chrome, React Frontend on localhost:5174, PHP Backend stopped

**Precondition:**  
React frontend is running.  
PHP backend server is not running.

**Steps to Reproduce:**
1. Open the React application.
2. Enter valid username `admin`.
3. Enter valid password `123456`.
4. Click the Login button.

**Expected Result:**  
The user should see a clear error message that the backend is not reachable.

**Actual Result:**  
The message `Backend ist nicht erreichbar.` is displayed.

**Severity:** Medium  
**Priority:** High  
**Status:** Documented / Handled

**Notes:**  
This behavior is handled in React using error handling with `catch`.

---

## BUG-002: Login with invalid password shows error message

**Environment:**  
Windows 11, Google Chrome, React Frontend on localhost:5174, PHP Backend on localhost:8000

**Precondition:**  
Admin user exists in the database.

**Steps to Reproduce:**
1. Open the login page.
2. Enter username `admin`.
3. Enter wrong password `wrongpassword`.
4. Click the Login button.

**Expected Result:**  
The system should reject the login and show a clear error message.

**Actual Result:**  
The message `Benutzername oder Passwort falsch` is displayed.

**Severity:** Low  
**Priority:** Medium  
**Status:** Documented / Expected Behavior

**Notes:**  
This is not a real defect. It is documented as a negative test scenario.

---

## BUG-003: Duplicate username is not allowed

**Environment:**  
Windows 11, Google Chrome, React Frontend on localhost:5174, PHP Backend on localhost:8000, MariaDB

**Precondition:**  
Admin user is logged in.  
A user with the username `test` already exists.

**Steps to Reproduce:**
1. Open the Employee Management page as admin.
2. Enter username `test`.
3. Enter a password.
4. Select a role.
5. Click `Benutzer speichern`.

**Expected Result:**  
The system should prevent duplicate usernames and show a clear message.

**Actual Result:**  
The message `Benutzername existiert bereits` is displayed.

**Severity:** Medium  
**Priority:** High  
**Status:** Documented / Handled

**Notes:**  
The backend checks if the username already exists before saving a new user.

---

## BUG-004: Invalid employee email format

**Environment:**  
Windows 11, Google Chrome, React Frontend on localhost:5174

**Precondition:**  
User is logged in.

**Steps to Reproduce:**
1. Open the Employee Management page.
2. Enter first name `Max`.
3. Enter last name `Mustermann`.
4. Enter invalid email `maxexample.com`.
5. Click `Mitarbeiter speichern`.

**Expected Result:**  
The employee should not be saved and a validation message should be displayed.

**Actual Result:**  
The message `Bitte eine gültige E-Mail eingeben.` is displayed.

**Severity:** Low  
**Priority:** Medium  
**Status:** Documented / Handled

**Notes:**  
Validation is implemented in the React frontend.

---

## BUG-005: Empty employee form fields

**Environment:**  
Windows 11, Google Chrome, React Frontend on localhost:5174

**Precondition:**  
User is logged in.

**Steps to Reproduce:**
1. Open the Employee Management page.
2. Leave first name empty.
3. Leave last name empty.
4. Leave email empty.
5. Click `Mitarbeiter speichern`.

**Expected Result:**  
The employee should not be saved and a validation message should be displayed.

**Actual Result:**  
The system displays validation messages, for example `Bitte Vorname eingeben.`

**Severity:** Low  
**Priority:** Medium  
**Status:** Documented / Handled

**Notes:**  
The frontend validates required fields before sending data to the backend.

---

## BUG-006: Delete employee confirmation dialog

**Environment:**  
Windows 11, Google Chrome, React Frontend on localhost:5174, PHP Backend on localhost:8000

**Precondition:**  
User is logged in.  
At least one employee exists.

**Steps to Reproduce:**
1. Click the `Löschen` button for an employee.
2. Observe the browser confirmation dialog.
3. Click Cancel.

**Expected Result:**  
The employee should not be deleted if the user cancels the confirmation dialog.

**Actual Result:**  
The employee remains in the list.

**Severity:** Low  
**Priority:** Medium  
**Status:** Documented / Handled

**Notes:**  
The delete function uses `window.confirm()` before sending the DELETE request.

---

## BUG-007: Normal user cannot add new users

**Environment:**  
Windows 11, Google Chrome, React Frontend on localhost:5174

**Precondition:**  
A user with role `user` exists.  
The normal user is logged in.

**Steps to Reproduce:**
1. Login with a normal user account.
2. Open the Employee Management page.
3. Check if the form `Neuen Benutzer hinzufügen` is visible.

**Expected Result:**  
The add-user form should not be visible for normal users.

**Actual Result:**  
The add-user form is not visible.

**Severity:** Medium  
**Priority:** High  
**Status:** Documented / Handled

**Notes:**  
The React frontend shows the add-user form only when the logged-in user has the role `admin`.

---

## BUG-008: Search with no matching employee

**Environment:**  
Windows 11, Google Chrome, React Frontend on localhost:5174

**Precondition:**  
User is logged in.  
Employee list is loaded.

**Steps to Reproduce:**
1. Enter a search text that does not match any employee.
2. Observe the employee list.

**Expected Result:**  
The system should show a clear message that no employees were found.

**Actual Result:**  
The message `Keine Mitarbeiter gefunden.` is displayed.

**Severity:** Low  
**Priority:** Low  
**Status:** Documented / Handled

**Notes:**  
This is expected behavior and confirms that the search function handles empty results.