const { Builder } = require('selenium-webdriver');
const LoginPage = require('./pages/LoginPage');

async function testSuccessfulLogin() {
    // Chrome Browser starten
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // LoginPage Objekt erstellen
        const loginPage = new LoginPage(driver);

        // Login-Seite öffnen
        await loginPage.open();

        // Login mit gültigen Daten durchführen
        await loginPage.login('admin', '123456');

        // Kurz warten, damit React die Seite aktualisieren kann
        await driver.sleep(1000);

        // Prüfen, ob Login erfolgreich war
        const loginSuccessful = await loginPage.isLoginSuccessful();

        if (!loginSuccessful) {
            throw new Error('Login war nicht erfolgreich');
        }

        console.log('Login success test passed');
    } catch (error) {
        console.error('Login success test failed');
        console.error(error);
    } finally {
        // Browser schließen
        await driver.quit();
    }
}

testSuccessfulLogin();