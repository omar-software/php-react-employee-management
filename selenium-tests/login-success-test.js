// Deutsche Kommentare:
// Wir importieren Selenium WebDriver.
const { Builder, By, until } = require("selenium-webdriver");

// Deutsche Kommentare:
// Diese Funktion testet den erfolgreichen Login.
async function testSuccessfulLogin() {
  // Deutsche Kommentare:
  // Wir starten den Chrome Browser.
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Deutsche Kommentare:
    // Wir öffnen die React App.
    // Wenn dein React auf 5173 läuft, ändere 5174 zu 5173.
    await driver.get("http://localhost:5174");

    // Deutsche Kommentare:
    // Wir warten, bis das Login-Feld sichtbar ist.
    await driver.wait(
      until.elementLocated(By.css("input[placeholder='Benutzername']")),
      5000
    );

    // Deutsche Kommentare:
    // Wir schreiben den Benutzernamen.
    await driver
      .findElement(By.css("input[placeholder='Benutzername']"))
      .sendKeys("admin");

    // Deutsche Kommentare:
    // Wir schreiben das Passwort.
    await driver
      .findElement(By.css("input[placeholder='Passwort']"))
      .sendKeys("123456");

    // Deutsche Kommentare:
    // Wir klicken auf den Login-Button.
    await driver.findElement(By.xpath("//button[text()='Login']")).click();

    // Deutsche Kommentare:
    // Wir warten, bis die Employee Management Seite sichtbar ist.
    await driver.wait(
      until.elementLocated(By.xpath("//h1[text()='Employee Management']")),
      5000
    );

    console.log("Test erfolgreich: Login funktioniert.");
  } catch (error) {
    console.log("Test fehlgeschlagen.");
    console.log(error);
  } finally {
    // Deutsche Kommentare:
    // Wir schließen den Browser.
    await driver.quit();
  }
}

// Deutsche Kommentare:
// Hier starten wir den Test.
testSuccessfulLogin();