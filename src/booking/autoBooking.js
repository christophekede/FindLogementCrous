const puppeteer = require("puppeteer");

/**
 * Reserver automatiquement un logement crous
 */

/**
 *
 * @param {*} rentId id de la location
 * @param {*} userName email de messervices.etudiant
 * @param {*} userPassword mot de passe de messervices.etudiant
 */
const autoBooking = async (rentId, attestationRessourcesFile, userName, userPassword) => {
  // 1 - Créer une instance de navigateur
  const browser = await puppeteer.launch({
    headless: false,
  });
  try {
    const page = await browser.newPage();

    // 2 - Naviguer jusqu'à l'URL cible
    // Se connecter
    await page.goto(
      `https://trouverunlogement.lescrous.fr/tools/residual/bb452681-c0f2-11ea-8c39-005056941f86/cart/request/${rentId}`
    );
    await page.waitFor(".PageHeader-user");
    await page.click(".PageHeader-user");
    await page.waitFor("#username");
    await page.focus("#username");
    await page.keyboard.type(userName);
    await page.waitFor("#password");
    await page.focus("#password");
    await page.keyboard.type(userPassword);
    await page.click("button[type='submit']");
    await page.waitFor(1000);
    const page2 = await browser.newPage();

    // Ajouter logement dans sa liste de selection
    await page2.goto(
      // "https://idp.messervices.etudiant.gouv.fr/idp/profile/SAML2/Redirect/SSO?execution=e"
      `https://trouverunlogement.lescrous.fr/tools/residual/bb452681-c0f2-11ea-8c39-005056941f86/accommodations/${rentId}`
    );
    await page2.waitFor(".AddToListButton > button");
    await page2.click(".AddToListButton > button");
    await page.waitFor(3000);

    // Formulaire de reservation du logement
    const page3 = await browser.newPage();
    await page3.goto(
      // "https://idp.messervices.etudiant.gouv.fr/idp/profile/SAML2/Redirect/SSO?execution=e"
      `https://trouverunlogement.lescrous.fr/tools/residual/bb452681-c0f2-11ea-8c39-005056941f86/cart/request/${rentId}`
    );
    // await page2.waitForNavigation({ waitUntil: "networkidle0" });
    await page3.waitFor("#alone");
    await page3.click(".Form-radio > #alone");
    await page3.waitFor("input");
    const fileInput = await page3.$("input[type=file]");

    // Ajout d'une attestation de ressource
    await fileInput.uploadFile("./mon_attestation_ressources");
    await page3.waitFor("button[type=submit]");
    await page3.click("button[type=submit]");
    await page3.waitFor(".Frame-footer");

    // Dé-commenter afin de pouvoir réserver 🔥
    // await page2.click(".Frame-footer > button:nth-child(2)");

    const result = await page.evaluate(() => {});

    // return true si la reservation a abouti

    return true;
  } catch (error) {
    console.log(error);
    browser.close();
    return false;
  }
};

module.exports = autoBooking;
