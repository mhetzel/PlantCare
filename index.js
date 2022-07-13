
var PlantData = {}



initGoogleAPIs().then(function(inited) {
  if (inited) {
    determineUserMode();
    displayLoginPage(); 
  }
});
