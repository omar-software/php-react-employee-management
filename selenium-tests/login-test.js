// Deutsche Kommentare:
// Wir importieren Selenium WebDriver.
const { Builder, By, until } = require("selenium-webdriver");

// Deutsche Kommentare:
// Diese Funktion startet unseren Test.
async function testLoginPage() {
  // Deutsche Kommentare:
  // Wir starten den Chrome Browser.
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Deutsche Kommentare:
    // Hier öffnen wir unsere React App.
    // Wenn dein React auf 5173 läuft, ändere 5174 zu 5173.
    await driver.get("http://localhost:5174");

    // Deutsche Kommentare:
    // Wir warten, bis die Überschrift Login sichtbar ist.
    await driver.wait(until.elementLocated(By.xpath("//h1[text()='Login']")), 5000);

    // Deutsche Kommentare:
    // Wir suchen das Eingabefeld für den Benutzernamen.
    await driver.findElement(By.css("input[placeholder='Benutzername']"));

    // Deutsche Kommentare:
    // Wenn alles funktioniert, zeigen wir diese Nachricht.
    console.log("Test erfolgreich: Login-Seite wurde gefunden.");
  } catch (error) {
    // Deutsche Kommentare:
    // Wenn etwas falsch ist, zeigen wir den Fehler.
    console.log("Test fehlgeschlagen.");
    console.log(error);
  } finally {
    // Deutsche Kommentare:
    // Am Ende schließen wir den Browser.
    await driver.quit();
  }
}

// Deutsche Kommentare:
// Hier starten wir die Test-Funktion.
testLoginPage();