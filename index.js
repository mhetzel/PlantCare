
var PlantData = {}


setupUserMode();
// loadConfig();
// setupDisplay();


async function setupUserMode() {
  await initGoogleAPIs();
  determineUserMode();
  displayLoginPage();

  // show login page if no user already set
}


function setupDisplay() {
  dropdownSetup();
  setDisplayForNoPlants();
}


