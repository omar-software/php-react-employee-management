// Deutsche Kommentare:
// Wir importieren Selenium WebDriver.
const { Builder, By, until } = require("selenium-webdriver");

// Deutsche Kommentare:
// Diese Funktion macht eine kleine Pause.
// Das hilft, damit React nach Aktionen kurz Zeit hat.
function sleep(milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
}

// Deutsche Kommentare:
// Diese Funktion testet Login + Create + Update + Delete.
async function testEmployeeCrud() {
  // Deutsche Kommentare:
  // Wir starten den Chrome Browser.
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Deutsche Kommentare:
    // Wir öffnen die React App.
    // Wenn dein React auf 5173 läuft, ändere 5174 zu 5173.
    await driver.get("http://localhost:5174");

    // Deutsche Kommentare:
    // Login-Daten eingeben.
    await driver.wait(
      until.elementLocated(By.css("input[placeholder='Benutzername']")),
      5000
    );

    await driver
      .findElement(By.css("input[placeholder='Benutzername']"))
      .sendKeys("admin");

    await driver
      .findElement(By.css("input[placeholder='Passwort']"))
      .sendKeys("123456");

    await driver.findElement(By.xpath("//button[text()='Login']")).click();

    // Deutsche Kommentare:
    // Warten, bis die Mitarbeiter-Seite sichtbar ist.
    await driver.wait(
      until.elementLocated(By.xpath("//h1[text()='Employee Management']")),
      5000
    );

    console.log("Login erfolgreich.");

    // Deutsche Kommentare:
    // Test-Mitarbeiter Daten.
    const firstName = "Selenium";
    const lastName = "Test";
    const email = "selenium@test.com";

    const updatedFirstName = "SeleniumUpdated";
    const updatedLastName = "TestUpdated";
    const updatedEmail = "selenium-updated@test.com";

    // Deutsche Kommentare:
    // Mitarbeiter hinzufügen.
    await driver
      .findElement(By.css("input[placeholder='Vorname']"))
      .sendKeys(firstName);

    await driver
      .findElement(By.css("input[placeholder='Nachname']"))
      .sendKeys(lastName);

    await driver
      .findElement(By.css("input[placeholder='E-Mail']"))
      .sendKeys(email);

    await driver
      .findElement(By.xpath("//button[text()='Mitarbeiter speichern']"))
      .click();

    await sleep(1000);

    // Deutsche Kommentare:
    // Nach dem neuen Mitarbeiter suchen.
    const searchInput = await driver.findElement(
      By.css("input[placeholder='Mitarbeiter suchen nach ID, Name oder E-Mail...']")
    );

    await searchInput.clear();
    await searchInput.sendKeys(email);

    await sleep(1000);

    // Deutsche Kommentare:
    // Prüfen, ob der Mitarbeiter sichtbar ist.
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'selenium@test.com')]")),
      5000
    );

    console.log("Mitarbeiter wurde erstellt.");

    // Deutsche Kommentare:
    // Mitarbeiter bearbeiten.
    await driver.findElement(By.xpath("//button[text()='Bearbeiten']")).click();

    await sleep(500);

    const firstNameInput = await driver.findElement(
      By.css("input[placeholder='Vorname']")
    );
    await firstNameInput.clear();
    await firstNameInput.sendKeys(updatedFirstName);

    const lastNameInput = await driver.findElement(
      By.css("input[placeholder='Nachname']")
    );
    await lastNameInput.clear();
    await lastNameInput.sendKeys(updatedLastName);

    const emailInput = await driver.findElement(
      By.css("input[placeholder='E-Mail']")
    );
    await emailInput.clear();
    await emailInput.sendKeys(updatedEmail);

    await driver
      .findElement(By.xpath("//button[text()='Änderungen speichern']"))
      .click();

    await sleep(1000);

    // Deutsche Kommentare:
    // Suche auf neue E-Mail ändern.
    await searchInput.clear();
    await searchInput.sendKeys(updatedEmail);

    await sleep(1000);

    // Deutsche Kommentare:
    // Prüfen, ob die Änderung sichtbar ist.
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'selenium-updated@test.com')]")),
      5000
    );

    console.log("Mitarbeiter wurde aktualisiert.");

    // Deutsche Kommentare:
    // Mitarbeiter löschen.
    await driver.findElement(By.xpath("//button[text()='Löschen']")).click();

    // Deutsche Kommentare:
    // Browser-Confirm bestätigen.
    await driver.switchTo().alert().accept();

    await sleep(1000);

    // Deutsche Kommentare:
    // Wenn keine Mitarbeiter gefunden wird, ist das für unseren Test gut.
    const pageText = await driver.findElement(By.css("body")).getText();

    if (pageText.includes(updatedEmail)) {
      throw new Error("Mitarbeiter wurde nicht gelöscht.");
    }

    console.log("Mitarbeiter wurde gelöscht.");

    console.log("CRUD Test erfolgreich.");
  } catch (error) {
    console.log("CRUD Test fehlgeschlagen.");
    console.log(error);
  } finally {
    // Deutsche Kommentare:
    // Browser schließen.
    await driver.quit();
  }
}

// Deutsche Kommentare:
// Hier starten wir den Test.
testEmployeeCrud();