
var PlantData = {}



initGoogleAPIs().then(function(inited) {
  if (inited) {
    determineUserMode();
    displayLoginPage(); 
  } else {
    console.log('apis not ready')
  }
});
