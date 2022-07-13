
var PlantData = {}


setupUserMode();
setupDisplay();


async function setupUserMode() {
  await initGoogleAPIs();
  determineUserMode();
  displayLoginPage(); 
  loadPlants();
}


function setupDisplay() {
  dropdownSetup();
  setDisplayForNoPlants();
}


