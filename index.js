
var PlantData = {}


setupUserMode();

async function setupUserMode() {
  await initGoogleAPIs();
  determineUserMode();
  displayLoginPage(); 
}
