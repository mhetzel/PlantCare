let locationDropdown = $("#location-dropdown");
let plantDropdown = $('#plant-dropdown');
let averageDaysBetweenWatering = $('#averageDaysBetweenWatering');
let currentWetness = $('#currentWetness');
let lastChecked = $('#lastChecked');
let lastWatered = $('#lastWatered');
let water = $('#water');
let light = $('#light');
let plantData = $('#plant-data');
let plantButtons = $('#plant-buttons');

locationDropdown.empty();
locationDropdown.append('<option selected="true" disabled>Choose Location</option>');
locationDropdown.prop('selectedIndex', 0);
resetPlantDropdown();



function setPlantInfo(info) {
  if (Object.keys(info).length) {
    plantData.show();
    plantButtons.show();
    resetPlantInfo();
    averageDaysBetweenWatering.text(info.averageDaysBetweenWatering);
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
  plantData.hide();
  plantButtons.hide();
};

function setupDropDowns() {
  
  Object.keys(PlantData).forEach(function(location) {
    locationDropdown.append($('<option></option>').attr('value', location).text(location));
  });

  locationDropdown.change(function() {
    resetPlantDropdown();

    Object.keys(PlantData[locationDropdown.val()]).forEach( plant => {
      plantDropdown.append($('<option></option>').attr('value', plant).text(plant));
    });
  });

  plantDropdown.change(function() {
    plantInfo = PlantData[locationDropdown.val()][plantDropdown.val()];
    console.log('here1')
    setPlantInfo(plantInfo);
  });
};

setupDropDowns();