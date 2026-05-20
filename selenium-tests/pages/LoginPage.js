const { By, until } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        // WebDriver wird vom Test übergeben
        this.driver = driver;

        // Selektoren für die Login-Seite
        this.usernameInput = By.css('input[type="text"]');
        this.passwordInput = By.css('input[type="password"]');
        this.loginButton = By.css('button');
    }

    async open() {
        // Öffnet die React Login-Seite
        await this.driver.get('http://localhost:5173');
    }

    async enterUsername(username) {
        // Wartet auf das Username-Feld und schreibt den Benutzername
        const input = await this.driver.wait(
            until.elementLocated(this.usernameInput),
            5000
        );

        await input.clear();
        await input.sendKeys(username);
    }

    async enterPassword(password) {
        // Wartet auf das Passwort-Feld und schreibt das Passwort
        const input = await this.driver.wait(
            until.elementLocated(this.passwordInput),
            5000
        );

        await input.clear();
        await input.sendKeys(password);
    }

    async clickLoginButton() {
        // Wartet auf den Login-Button und klickt darauf
        const button = await this.driver.wait(
            until.elementLocated(this.loginButton),
            5000
        );

        await button.click();
    }

    async login(username, password) {
        // Kompletter Login-Ablauf
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async isLoginSuccessful() {
    // Prüft, ob nach dem Login ein Text der Mitarbeiter-Seite sichtbar ist
    const pageSource = await this.driver.getPageSource();

    return pageSource.includes('Employee') ||
           pageSource.includes('Employees') ||
           pageSource.includes('Add Employee') ||
           pageSource.includes('Logout') ||
           pageSource.includes('Mitarbeiter');
}
}

module.exports = LoginPage;