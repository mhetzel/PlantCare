
var PlantData = {}


setupUserMode();
loadPlants();
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


