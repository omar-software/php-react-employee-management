<?php
// Deutsche Kommentare:
// Hier speichern wir die Daten für die Verbindung zur Datenbank.

$host = "localhost";
$dbname = "php_react_employee_db";
$username = "root";
$password = "";

// Deutsche Kommentare:
// Wir erstellen eine Verbindung zur MySQL/MariaDB Datenbank.
$conn = new mysqli($host, $username, $password, $dbname);

// Deutsche Kommentare:
// Wenn die Verbindung fehlschlägt, zeigen wir eine Fehlermeldung.
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}
?>