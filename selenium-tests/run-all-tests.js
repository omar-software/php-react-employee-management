// Deutsche Kommentare:
// child_process erlaubt uns, andere Node-Dateien nacheinander zu starten.
const { execSync } = require("child_process");

// Deutsche Kommentare:
// Hier speichern wir alle Test-Dateien.
const tests = [
  "login-test.js",
  "login-success-test.js",
  "employee-crud-test.js",
];

// Deutsche Kommentare:
// Wir gehen jeden Test durch und starten ihn.
for (let i = 0; i < tests.length; i++) {
  const testFile = tests[i];

  console.log("--------------------------------");
  console.log("Starte Test: " + testFile);
  console.log("--------------------------------");

  try {
    // Deutsche Kommentare:
    // stdio: "inherit" zeigt die Ausgabe direkt im Terminal.
    execSync("node " + testFile, { stdio: "inherit" });

    console.log("Test fertig: " + testFile);
  } catch (error) {
    console.log("Test fehlgeschlagen: " + testFile);

    // Deutsche Kommentare:
    // Wenn ein Test fehlschlägt, stoppen wir alle Tests.
    process.exit(1);
  }
}

console.log("--------------------------------");
console.log("Alle Selenium Tests waren erfolgreich.");
console.log("--------------------------------");