var locationDropdown = $("#location-dropdown");
var plantDropdown = $('#plant-dropdown');
var averageDaysBetweenWatering = $('#averageDaysBetweenWatering');
var currentWetness = $('#currentWetness');
var lastChecked = $('#lastChecked');
var lastWatered = $('#lastWatered');
var water = $('#water');
var light = $('#light');
var plantInfo = $('#plant-info');
var plantButtons = $('#plant-buttons');

function resetLocationDropdown() {
  locationDropdown.empty();
  locationDropdown.append('<option selected="true" disabled>Choose Location</option>');
  locationDropdown.prop('selectedIndex', 0);
}

function setPlantInfo(info) {
  if (Object.keys(info).length) {
    plantInfo.show();
    plantButtons.show();
    resetPlantInfo();
    averageDaysBetweenWatering.text(Math.floor(info.averageDaysBetweenWatering));
    currentWetness.text(info.currentWetness);
    lastChecked.text(info.lastChecked);
    lastWatered.text(info.lastWatered);
    water.text(info.water);
    light.text(info.light);
  }
};

function resetPlantInfo() {
  averageDaysBetweenWatering.text('n/a')
  currentWetness.text('n/a')
  lastChecked.text('n/a')
  lastWatered.text('n/a')
  water.text('n/a')
  light.text('n/a')
};

function resetPlantDropdown() {
  plantDropdown.empty();
  plantDropdown.append('<option selected="true" disabled>Choose Plant</option>');
  plantDropdown.prop('selectedIndex', 0);
  plantInfo.hide();
  plantButtons.hide();
};

function setupDropDowns(plantData) {
  
  Object.keys(plantData).forEach(function(location) {
    locationDropdown.append($('<option></option>').attr('value', location).text(location));
  });

  locationDropdown.change(function() {
    resetPlantDropdown();

    Object.keys(plantData[locationDropdown.val()]).forEach( plant => {
      plantDropdown.append($('<option></option>').attr('value', plant).text(plant));
    });
  });

  plantDropdown.change(function() {
    plant = plantData[locationDropdown.val()][plantDropdown.val()];
    setPlantInfo(plant);
  });
};

function dropdownSetup(plantData) {
  resetLocationDropdown();
  resetPlantDropdown();
  setupDropDowns(plantData);
}

