
var PlantData = {}


setupUserMode();
// loadConfig();
// setupDisplay();


async function setupUserMode() {
  await initGoogleAPIs();
  determineUserMode();
  displayLoginPage();
}


function setupDisplay() {
  dropdownSetup();
  setDisplayForNoPlants();
}


