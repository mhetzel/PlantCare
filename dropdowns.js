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


function setupNewPlantDropdowns() {
  $('#newPlantPetSafe').prop('selectedIndex', 0);
  
  $('#newPlantWaterInstructions').empty();
  $('#newPlantWaterInstructions').append($('<option></option>').attr('value', WateringInstructions[0]).text(WateringInstructions[0]));
  $('#newPlantWaterInstructions').append($('<option></option>').attr('value', WateringInstructions[1]).text(WateringInstructions[1]));
  $('#newPlantWaterInstructions').append($('<option></option>').attr('value', WateringInstructions[2]).text(WateringInstructions[2]));
  $('#newPlantWaterInstructions').append($('<option></option>').attr('value', WateringInstructions[3]).text(WateringInstructions[3]));
  $('#newPlantWaterInstructions').append($('<option></option>').attr('value', WateringInstructions[4]).text(WateringInstructions[4]));
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

function setPlantInfo(info) {
  if (Object.keys(info).length) {
    plantInfo.show();
    plantButtons.show();
    resetPlantInfo();
    let average = info.daysTotal/info.wateringCount;
    averageDaysBetweenWatering.text(isNaN(average) ? 'n/a' : Math.floor(average));
    currentWetness.prop('selectedIndex', info.currentWetness);
    lastChecked.text(info.lastChecked);
    lastWatered.text(info.lastWatered);
    water.text(WaterList[info.water]);
    light.text(LightList[info.light]);
    waterInstructions.text(info.waterInstructions)
    soil.text(info.soil)
    fertilzerFrequency.text(info.fertilzerFrequency)
    fertilzerDose.text(info.fertilzerDose)
    petSafe.text(info.petSafe)
    humidity.text(info.humidity)
  }
};

function resetPlantInfo() {
  setupCurrentWetness();
  averageDaysBetweenWatering.text('n/a')
  lastChecked.text('n/a')
  lastWatered.text('n/a')
  water.text('n/a')
  light.text('n/a')
  
  waterInstructions.text('n/a')
  soil.text('n/a')
  fertilzerFrequency.text('n/a')
  fertilzerDose.text('n/a')
  petSafe.text('n/a')
  humidity.text('n/a')
};

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
  await loadPlants()
  Object.keys(PlantData).forEach(function(location) {
    locationDropdown.append($('<option></option>').attr('value', location).text(location));
  });
}

async function dropdownSetup() {
  resetLocationDropdown();
  resetPlantDropdown();
  await setupDropDowns();
}

