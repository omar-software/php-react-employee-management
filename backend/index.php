<?php
// Deutsche Kommentare:
// Diese Zeilen zeigen PHP-Fehler im Browser.
// Das hilft uns beim Debuggen.
ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);

// Deutsche Kommentare:
// Wir erlauben dem React Frontend, Daten von diesem PHP Backend zu lesen.
header("Access-Control-Allow-Origin: *");

// Deutsche Kommentare:
// Wir erlauben die HTTP-Methoden für CRUD, Login und Users.
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Deutsche Kommentare:
// Wir erlauben JSON-Daten im Request.
header("Access-Control-Allow-Headers: Content-Type");

// Deutsche Kommentare:
// Wir sagen dem Browser, dass die Antwort JSON ist.
header("Content-Type: application/json");

// Deutsche Kommentare:
// OPTIONS ist eine Vor-Anfrage vom Browser.
// Wir beenden sie direkt.
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    exit();
}

// Deutsche Kommentare:
// Wir verbinden diese Datei mit der Datenbank.
include "db.php";

$url = $_SERVER["REQUEST_URI"];
$path = parse_url($url, PHP_URL_PATH);
$method = $_SERVER["REQUEST_METHOD"];

// Deutsche Kommentare:
// POST /api/login
// Diese Route prüft Benutzername und Passwort.
if ($path == "/api/login" && $method == "POST") {

    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    $username = $data["username"];
    $password = $data["password"];

    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);

    $stmt->bind_param("s", $username);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user["password"])) {
            echo json_encode([
                "success" => true,
                "message" => "Login erfolgreich",
                "username" => $user["username"],
                "role" => $user["role"]
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Benutzername oder Passwort falsch"
            ]);
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Benutzername oder Passwort falsch"
        ]);
    }

    $stmt->close();
}

// Deutsche Kommentare:
// POST /api/users
// Diese Route erstellt einen neuen Benutzer.
else if ($path == "/api/users" && $method == "POST") {

    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    $newUsername = $data["username"];
    $newPassword = $data["password"];
    $newRole = $data["role"];

    $checkSql = "SELECT * FROM users WHERE username = ?";
    $checkStmt = $conn->prepare($checkSql);

    $checkStmt->bind_param("s", $newUsername);
    $checkStmt->execute();

    $checkResult = $checkStmt->get_result();

    if ($checkResult->num_rows > 0) {
        echo json_encode([
            "success" => false,
            "message" => "Benutzername existiert bereits"
        ]);

        $checkStmt->close();
    } else {
        $checkStmt->close();

        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (username, password, role)
                VALUES (?, ?, ?)";

        $stmt = $conn->prepare($sql);

        $stmt->bind_param("sss", $newUsername, $hashedPassword, $newRole);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Benutzer wurde erstellt"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Fehler beim Erstellen vom Benutzer"
            ]);
        }

        $stmt->close();
    }
}

// Deutsche Kommentare:
// GET /api/employees
// Alle Mitarbeiter aus der Datenbank lesen.
else if ($path == "/api/employees" && $method == "GET") {

    $sql = "SELECT * FROM employees";
    $result = $conn->query($sql);

    $employees = [];

    while ($row = $result->fetch_assoc()) {
        $employees[] = [
            "id" => $row["id"],
            "firstName" => $row["first_name"],
            "lastName" => $row["last_name"],
            "email" => $row["email"]
        ];
    }

    echo json_encode($employees);
}

// Deutsche Kommentare:
// POST /api/employees
// Neuen Mitarbeiter speichern.
else if ($path == "/api/employees" && $method == "POST") {

    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    $firstName = $data["firstName"];
    $lastName = $data["lastName"];
    $email = $data["email"];

    $sql = "INSERT INTO employees (first_name, last_name, email)
            VALUES (?, ?, ?)";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("sss", $firstName, $lastName, $email);

    if ($stmt->execute()) {
        echo json_encode([
            "message" => "Mitarbeiter wurde gespeichert"
        ]);
    } else {
        echo json_encode([
            "message" => "Fehler beim Speichern"
        ]);
    }

    $stmt->close();
}

// Deutsche Kommentare:
// PUT /api/employees
// Mitarbeiter bearbeiten.
else if ($path == "/api/employees" && $method == "PUT") {

    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    $id = $data["id"];
    $firstName = $data["firstName"];
    $lastName = $data["lastName"];
    $email = $data["email"];

    $sql = "UPDATE employees
            SET first_name = ?,
                last_name = ?,
                email = ?
            WHERE id = ?";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("sssi", $firstName, $lastName, $email, $id);

    if ($stmt->execute()) {
        echo json_encode([
            "message" => "Mitarbeiter wurde aktualisiert"
        ]);
    } else {
        echo json_encode([
            "message" => "Fehler beim Aktualisieren"
        ]);
    }

    $stmt->close();
}

// Deutsche Kommentare:
// DELETE /api/employees?id=1
// Mitarbeiter löschen.
else if ($path == "/api/employees" && $method == "DELETE") {

    $id = $_GET["id"];

    $sql = "DELETE FROM employees WHERE id = ?";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode([
            "message" => "Mitarbeiter wurde gelöscht"
        ]);
    } else {
        echo json_encode([
            "message" => "Fehler beim Löschen"
        ]);
    }

    $stmt->close();
}

else {
    echo json_encode([
        "message" => "Route nicht gefunden"
    ]);
}

$conn->close();
?>