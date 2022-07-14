var locationDropdown = $("#location-dropdown");
var plantDropdown = $('#plant-dropdown');
var averageDaysBetweenWatering = $('#averageDaysBetweenWatering');
var currentWetness = $('#currentWetness');
var lastChecked = $('#lastChecked');
var lastWatered = $('#lastWatered');
var water = $('#water');
var waterInstructions = $('#waterInstructions');
var soil = $('#soil');
var fertilzerFrequency = $('#fertilzerFrequency');
var fertilzerDose = $('#fertilzerDose');
var petSafe = $('#petSafe');
var humidity = $('#humidity');
var light = $('#light');
var plantInfo = $('#plant-info');
var plantButtons = $('#plant-buttons');


function setupUpdatedPlantDropdowns() {
  
}

function setupNewPlantDropdowns() {
  $('#newPlantPetSafe').prop('selectedIndex', 0);
  
  $('#newPlantWaterInstructions').empty();
  WateringInstructions.forEach(function(x) {
    $('#newPlantWaterInstructions').append($('<option></option>').attr('value', x).text(x));
  });
  $('#newPlantWaterInstructions').prop('selectedIndex', 0);

  $('#newPlantSoilPreferences').empty();
  SoilList.forEach(function(x) {
    $('#newPlantSoilPreferences').append($('<option></option>').attr('value', x).text(x));
  });
  $('#newPlantSoilPreferences').prop('selectedIndex', 0);

  $('#newPlantHumitidy').empty();
  HumidityLevels.forEach(function(x) {
    $('#newPlantHumitidy').append($('<option></option>').attr('value', x).text(x));
  });
  $('#newPlantHumitidy').prop('selectedIndex', 0);

  $('#newPlantFertilizer').empty();
  FertilizerSchedule.forEach(function(x) {
    $('#newPlantFertilizer').append($('<option></option>').attr('value', x).text(x));
  });
  $('#newPlantFertilizer').prop('selectedIndex', 0);

  $('#newPlantFertilizerDose').empty();
  FertilizerDoses.forEach(function(x) {
    $('#newPlantFertilizerDose').append($('<option></option>').attr('value', x).text(x));
  });
  $('#newPlantFertilizerDose').prop('selectedIndex', 0);

  waterDropdown($('#newPlantWaterNeeds'));

  $('#newPlantLightNeeds').empty();
  LightList.forEach(function(x) {
    $('#newPlantLightNeeds').append($('<option></option>').attr('value', x).text(x));
  });
  $('#newPlantLightNeeds').prop('selectedIndex', 0);
  
  $( ".multiselect-dropdown").css('width', '100%')
}

function waterDropdown(dropdown) {
  dropdown.empty();
  WaterList.forEach(function(x) {
    dropdown.append($('<option></option>').attr('value', x).text(x));
  });
  dropdown.prop('selectedIndex', 0);
}

function setupCurrentWetness() {
  waterDropdown(currentWetness);
}

function resetLocationDropdown() {
  locationDropdown.empty();
  locationDropdown.append('<option selected="true" disabled>Choose Location</option>');
  locationDropdown.prop('selectedIndex', 0);
}

function resetPlantDropdown() {
  plantDropdown.empty();
  plantDropdown.append('<option selected="true" disabled>Choose Plant</option>');
  plantDropdown.prop('selectedIndex', 0);
  plantInfo.hide();
  plantButtons.hide();
};

function plantSelectionChange() {
  plant = PlantData[locationDropdown.val()][plantDropdown.val()];
  setPlantInfo(plant);
}

function locationSelectionChange() {
  resetPlantDropdown();

  Object.keys(PlantData[locationDropdown.val()]).forEach( plant => {
    plantDropdown.append($('<option></option>').attr('value', plant).text(plant));
  });
  
  if (Object.keys(PlantData[locationDropdown.val()]).length === 1) {
    plantDropdown.prop('selectedIndex', 1);
    plantSelectionChange();
  }
}

async function setupDropDowns() {
  if (PlantData) {
    Object.keys(PlantData).forEach(function(location) {
      if (Object.keys(PlantData[location]).length > 0) {
        locationDropdown.append($('<option></option>').attr('value', location).text(location));
      } else {
        delete PlantData[location];
        saveConfig(PlantData);
      }
    });
    if (Object.keys(PlantData).length === 1) {
      locationDropdown.prop('selectedIndex', 1);
      locationSelectionChange();
    }
  }
}

async function dropdownSetup() {
  resetLocationDropdown();
  resetPlantDropdown();
  await setupDropDowns();
}

