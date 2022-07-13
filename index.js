
var PlantData = {}


setupUserMode();
setupDisplay();


async function setupUserMode() {
  await initGoogleAPIs();
  determineUserMode();
  displayLoginPage(); 
}


function setupDisplay() {
  dropdownSetup();
  setDisplayForNoPlants();
}


