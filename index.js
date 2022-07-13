
var PlantData = {}


setupUserMode();

async function setupUserMode() {
  await initGoogleAPIs().then(determineUserMode());
  displayLoginPage(); 
}
