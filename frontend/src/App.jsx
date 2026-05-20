import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [role, setRole] = useState("");

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("user");

  const [employees, setEmployees] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const employeesPerPage = 5;

  function checkLogin() {
    const savedLogin = localStorage.getItem("isLoggedIn");
    const savedUsername = localStorage.getItem("username");
    const savedRole = localStorage.getItem("role");

    if (savedLogin === "true") {
      setIsLoggedIn(true);
      setLoggedInUsername(savedUsername);
      setRole(savedRole);
    }
  }

  function login() {
    if (username.trim() === "") {
      setMessage("Bitte Benutzername eingeben.");
      return;
    }

    if (password.trim() === "") {
      setMessage("Bitte Passwort eingeben.");
      return;
    }

    const loginData = {
      username: username,
      password: password,
    };

    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.success === true) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", data.username);
          localStorage.setItem("role", data.role);

          setIsLoggedIn(true);
          setLoggedInUsername(data.username);
          setRole(data.role);

          setMessage("Login erfolgreich.");
          setUsername("");
          setPassword("");

          loadEmployees();
        } else {
          setMessage(data.message);
        }
      })
      .catch(function () {
        setMessage("Backend ist nicht erreichbar.");
      });
  }

  function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    setIsLoggedIn(false);
    setEmployees([]);
    setRole("");
    setLoggedInUsername("");
    setMessage("Logout erfolgreich.");
  }

  function createUser() {
    if (newUsername.trim() === "") {
      setMessage("Bitte neuen Benutzernamen eingeben.");
      return;
    }

    if (newPassword.trim() === "") {
      setMessage("Bitte neues Passwort eingeben.");
      return;
    }

    const userData = {
      username: newUsername,
      password: newPassword,
      role: newRole,
    };

    fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setMessage(data.message);

        if (data.success === true) {
          setNewUsername("");
          setNewPassword("");
          setNewRole("user");
        }
      })
      .catch(function () {
        setMessage("Backend ist nicht erreichbar.");
      });
  }

  function loadEmployees() {
    setLoading(true);

    fetch("http://localhost:8000/api/employees")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setEmployees(data);
        setLoading(false);
      })
      .catch(function () {
        setMessage("Backend ist nicht erreichbar.");
        setLoading(false);
      });
  }

  function isFormValid() {
    if (firstName.trim() === "") {
      setMessage("Bitte Vorname eingeben.");
      return false;
    }

    if (lastName.trim() === "") {
      setMessage("Bitte Nachname eingeben.");
      return false;
    }

    if (email.trim() === "") {
      setMessage("Bitte E-Mail eingeben.");
      return false;
    }

    if (!email.includes("@")) {
      setMessage("Bitte eine gültige E-Mail eingeben.");
      return false;
    }

    return true;
  }

  function saveEmployee() {
    if (isFormValid() === false) {
      return;
    }

    const employee = {
      id: editId,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    let methodName = "POST";

    if (editId !== null) {
      methodName = "PUT";
    }

    fetch("http://localhost:8000/api/employees", {
      method: methodName,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function () {
        loadEmployees();

        if (editId === null) {
          setMessage("Mitarbeiter wurde gespeichert.");
        } else {
          setMessage("Mitarbeiter wurde aktualisiert.");
        }

        clearForm();
      })
      .catch(function () {
        setMessage("Backend ist nicht erreichbar.");
      });
  }

  function editEmployee(employee) {
    setEditId(employee.id);
    setFirstName(employee.firstName);
    setLastName(employee.lastName);
    setEmail(employee.email);
    setMessage("Bearbeitungsmodus aktiv.");
  }

  function deleteEmployee(id) {
    const answer = window.confirm("Möchtest du diesen Mitarbeiter wirklich löschen?");

    if (answer === false) {
      return;
    }

    fetch("http://localhost:8000/api/employees?id=" + id, {
      method: "DELETE",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function () {
        loadEmployees();
        setMessage("Mitarbeiter wurde gelöscht.");
      })
      .catch(function () {
        setMessage("Backend ist nicht erreichbar.");
      });
  }

  function clearForm() {
    setEditId(null);
    setFirstName("");
    setLastName("");
    setEmail("");
  }

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function previousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const filteredEmployees = employees.filter(function (employee) {
    const fullName = employee.firstName + " " + employee.lastName;
    const text = searchText.toLowerCase();

    return (
      employee.id.toString().includes(text) ||
      fullName.toLowerCase().includes(text) ||
      employee.email.toLowerCase().includes(text)
    );
  });

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  const visibleEmployees = filteredEmployees.slice(startIndex, endIndex);

  useEffect(function () {
    checkLogin();
  }, []);

  useEffect(
    function () {
      if (isLoggedIn === true) {
        loadEmployees();
      }
    },
    [isLoggedIn]
  );

  useEffect(
    function () {
      setCurrentPage(1);
    },
    [searchText]
  );

  if (isLoggedIn === false) {
    return (
      <div className="page">
        <div className="container">
          <div className="login-card">
            <h1>Login</h1>

            <p className="subtitle">
              Bitte melde dich an, um die Mitarbeiter zu verwalten.
            </p>

            {message !== "" && (
              <div className="message">
                {message}
              </div>
            )}

            <input
              type="text"
              placeholder="Benutzername"
              value={username}
              onChange={function (event) {
                setUsername(event.target.value);
              }}
            />

            <input
              type={showLoginPassword ? "text" : "password"}
              placeholder="Passwort"
              value={password}
              onChange={function (event) {
                setPassword(event.target.value);
              }}
            />

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={showLoginPassword}
                onChange={function () {
                  setShowLoginPassword(!showLoginPassword);
                }}
              />
              Passwort anzeigen
            </label>

            <button className="save-button" onClick={login}>
              Login
            </button>

            <p className="hint">
              Testdaten: admin / 123456
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="top-bar">
          <div>
            <h1>Employee Management</h1>

            <p className="subtitle">
              PHP + React + MariaDB Full-Stack Projekt
            </p>

            <p className="result-info">
              Eingeloggt als: {loggedInUsername} ({role})
            </p>
          </div>

          <button className="delete-button" onClick={logout}>
            Logout
          </button>
        </div>

        {message !== "" && (
          <div className="message">
            {message}
          </div>
        )}

        {role === "admin" && (
          <div className="form-card">
            <h2>Neuen Benutzer hinzufügen</h2>

            <input
              type="text"
              placeholder="Neuer Benutzername"
              value={newUsername}
              onChange={function (event) {
                setNewUsername(event.target.value);
              }}
            />

            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Neues Passwort"
              value={newPassword}
              onChange={function (event) {
                setNewPassword(event.target.value);
              }}
            />

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={showNewPassword}
                onChange={function () {
                  setShowNewPassword(!showNewPassword);
                }}
              />
              Passwort anzeigen
            </label>

            <select
              value={newRole}
              onChange={function (event) {
                setNewRole(event.target.value);
              }}
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>

            <button className="save-button" onClick={createUser}>
              Benutzer speichern
            </button>
          </div>
        )}

        <div className="form-card">
          <h2>
            {editId === null
              ? "Neuen Mitarbeiter hinzufügen"
              : "Mitarbeiter bearbeiten"}
          </h2>

          <input
            type="text"
            placeholder="Vorname"
            value={firstName}
            onChange={function (event) {
              setFirstName(event.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Nachname"
            value={lastName}
            onChange={function (event) {
              setLastName(event.target.value);
            }}
          />

          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={function (event) {
              setEmail(event.target.value);
            }}
          />

          <div className="button-row">
            <button className="save-button" onClick={saveEmployee}>
              {editId === null ? "Mitarbeiter speichern" : "Änderungen speichern"}
            </button>

            <button className="cancel-button" onClick={clearForm}>
              Abbrechen
            </button>
          </div>
        </div>

        <h2>Mitarbeiter Liste</h2>

        <input
          type="text"
          className="search-input"
          placeholder="Mitarbeiter suchen nach ID, Name oder E-Mail..."
          value={searchText}
          onChange={function (event) {
            setSearchText(event.target.value);
          }}
        />

        <p className="result-info">
          Gefunden: {filteredEmployees.length} Mitarbeiter
        </p>

        {loading === true && (
          <p className="result-info">
            Loading employees...
          </p>
        )}

        <div className="employee-list">
          {visibleEmployees.map(function (employee) {
            return (
              <div className="employee-card" key={employee.id}>
                <div>
                  <h3>
                    #{employee.id} - {employee.firstName} {employee.lastName}
                  </h3>

                  <p>{employee.email}</p>
                </div>

                <div className="card-buttons">
                  <button
                    className="edit-button"
                    onClick={function () {
                      editEmployee(employee);
                    }}
                  >
                    Bearbeiten
                  </button>

                  <button
                    className="delete-button"
                    onClick={function () {
                      deleteEmployee(employee.id);
                    }}
                  >
                    Löschen
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEmployees.length === 0 && loading === false && (
          <p className="result-info">
            Keine Mitarbeiter gefunden.
          </p>
        )}

        <div className="pagination">
          <button
            className="cancel-button"
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Seite {totalPages === 0 ? 0 : currentPage} von {totalPages}
          </span>

          <button
            className="save-button"
            onClick={nextPage}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;