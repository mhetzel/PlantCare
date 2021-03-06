var averageDaysBetweenWatering = $('#averageDaysBetweenWatering');
var currentWetness = $('#currentWetness');
var lastChecked = $('#lastChecked');
var lastWatered = $('#lastWatered');
var lastFertilized = $('#lastFertilized');
var water = $('#water');
var waterInstructions = $('#waterInstructions');
var soil = $('#soil');
var fertilzerFrequency = $('#fertilzerFrequency');
var fertilzerDose = $('#fertilzerDose');
var petSafe = $('#petSafe');
var humidity = $('#humidity');
var light = $('#light');

async function fertilizePlant() {
  let location = locationDropdown.val();
  let plantName = plantDropdown.val();
  let locationIndex = locationDropdown.prop('selectedIndex');
  let plantIndex = plantDropdown.prop('selectedIndex');
  const today = new Date();
  PlantData[location][plantName].lastFertilized = today.toDateString();

  await saveConfig(PlantData);
  resetPlantSelection(locationIndex, plantIndex);
};

async function checkPlant() {
  let location = locationDropdown.val();
  let plantName = plantDropdown.val();
  let locationIndex = locationDropdown.prop('selectedIndex');
  let plantIndex = plantDropdown.prop('selectedIndex');
  const today = new Date();
  PlantData[location][plantName].lastChecked = today.toDateString();
  
  PlantData[location][plantName].currentWetness = currentWetness.prop('selectedIndex');
  await saveConfig(PlantData);
  resetPlantSelection(locationIndex, plantIndex);
};

function resetPlantSelection(locationIndex, plantIndex) {
  locationDropdown.prop('selectedIndex', locationIndex);
  locationSelectionChange();
  plantDropdown.prop('selectedIndex', plantIndex);
  plantSelectionChange();
}

async function waterPlant() {
  let location = locationDropdown.val();
  let plantName = plantDropdown.val();
  let locationIndex = locationDropdown.prop('selectedIndex');
  let plantIndex = plantDropdown.prop('selectedIndex');
  const today = new Date();
  PlantData[location][plantName].lastChecked = today.toDateString();
  
  const last = 'lastWatered' in PlantData[location][plantName] ? new Date(PlantData[location][plantName].lastWatered) : today;
  const daysTotal = 'daysTotal' in PlantData[location][plantName] ? PlantData[location][plantName].daysTotal : 0;
  const wateringCount = 'wateringCount' in PlantData[location][plantName] ? PlantData[location][plantName].wateringCount : 0;

  PlantData[location][plantName].daysTotal = daysTotal + (today - last);
  PlantData[location][plantName].wateringCount = wateringCount + 1;
  PlantData[location][plantName].lastWatered = today.toDateString();
  PlantData[location][plantName].currentWetness = 0;

  await saveConfig(PlantData);
  resetPlantSelection(locationIndex, plantIndex);
};

function resetUpdatedPlantInfo() {
  let location = locationDropdown.val();
  let plantName = plantDropdown.val();
  let plant = PlantData[location][plantName];
  setupUpdatedPlantDropdowns();

  $("#updatedPlantWaterNeeds").val(plant['water']);
  $("#updatedPlantWaterInstructions").val(plant['waterInstructions']);
  $("#updatedPlantSoilPreferences").val(plant['soil']);
  $("#updatedPlantFertilizer").val(plant['fertilzerFrequency']);
  $("#updatedPlantFertilizerDose").val(plant['fertilzerDose']);
  $("#updatedPlantLightNeeds").val(plant['light']);
  $("#updatedPlantPetSafe").val(plant['petSafe']);
  $("#updatedPlantHumitidy").val(plant['humidity']);
}

async function updatePlant() {
  let location = locationDropdown.val();
  let plantName = plantDropdown.val();
  let plant = PlantData[location][plantName];
  let locationIndex = locationDropdown.prop('selectedIndex');
  let plantIndex = plantDropdown.prop('selectedIndex');
  
  let newPlantInfo = readPlantInputs("#updated");
  PlantData[location][plantName] = {...PlantData[location][plantName], ...newPlantInfo};
  
  toggleUpdatePlantForm();
  
  await saveConfig(PlantData);
  resetPlantSelection(locationIndex, plantIndex);
};

function toggleMovePlantForm() {
  $("#movedPlantLocation").val('');
  if ($("#moving-location-div").css('display') == 'block') {
    $("#moving-location-div").hide();
  } else {
    $("#moving-location-div").show();
  }
};

function toggleUpdatePlantForm() {
  resetUpdatedPlantInfo()
  if ($("#updating-plant-div").css('display') == 'block') {
    $("#updating-plant-div").hide();
  } else {
    $("#updating-plant-div").show();
  }
};

async function movePlant() {
  let newLocation = $("#movedPlantLocation").val();
  let location = locationDropdown.val();
  let plantName = plantDropdown.val();
  let locationIndex = locationDropdown.prop('selectedIndex');
  let plantIndex = plantDropdown.prop('selectedIndex');
  plant = PlantData[location][plantName];
  delete PlantData[location][plantName];
  if (Object.keys(PlantData[location]).length === 0) {
    delete PlantData[location];
  }

  if (!PlantData.hasOwnProperty(newLocation)) {
    PlantData[newLocation] = {};
  }

  PlantData[newLocation][plantName] = plant;
  toggleMovePlantForm();
  await saveConfig(PlantData);
  locationDropdown.val(newLocation);
  resetPlantSelection(locationDropdown.prop('selectedIndex'), plantIndex);
};

async function deletePlant() {
  delete PlantData[locationDropdown.val()][plantDropdown.val()];
  if (Object.keys(PlantData[locationDropdown.val()]).length === 0) {
    delete PlantData[locationDropdown.val()];
  }
  await saveConfig(PlantData);
};

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
    waterInstructions.text(info.waterInstructions);
    soil.text(info.soil);
    lastFertilized.text(info.lastFertilized);
    fertilzerFrequency.text(info.fertilzerFrequency);
    fertilzerDose.text(info.fertilzerDose);
    petSafe.text(info.petSafe);
    humidity.text(info.humidity);
  }
};

function resetPlantInfo() {
  setupCurrentWetness();
  averageDaysBetweenWatering.text('n/a');
  lastChecked.text('n/a');
  lastWatered.text('n/a');
  water.text('n/a');
  light.text('n/a');
  
  waterInstructions.text('n/a');
  soil.text('n/a');
  lastFertilized.text('n/a');
  fertilzerFrequency.text('n/a');
  fertilzerDose.text('n/a');
  petSafe.text('n/a');
  humidity.text('n/a');
};

function readPlantInputs(idPrefix) {
  let inputs = {};
  inputs['water'] = $(idPrefix+"PlantWaterNeeds").prop('selectedIndex');
  inputs['light'] = $(idPrefix+"PlantLightNeeds").prop('selectedIndex');
  inputs['waterInstructions'] = $(idPrefix+"PlantWaterInstructions").val();
  inputs['soil'] = $(idPrefix+"PlantSoilPreferences").val();
  inputs['fertilzerFrequency'] = $(idPrefix+"PlantFertilizer").val();
  inputs['fertilzerDose'] = $(idPrefix+"PlantFertilizerDose").val();
  inputs['petSafe'] = $(idPrefix+"PlantPetSafe").val();
  inputs['humidity'] = $(idPrefix+"PlantHumitidy").val();
  return inputs;
}

async function addNewPlant() {
  let newLocation = $("#newPlantLocation").val();
  let newName = $("#newPlantName").val();
  if (newName) {
    if (!PlantData.hasOwnProperty(newLocation)) {
      PlantData[newLocation] = {};
    }
      
    if (!PlantData[newLocation].hasOwnProperty(newName)) {
      PlantData[newLocation][newName] = {};
    }
    
    let inputs = readPlantInputs("#new");
    PlantData[newLocation][newName] = {...PlantData[newLocation][newName], ...inputs};
  
    let lastWatered = $("#newPlantLastWatered").val();
    if (lastWatered) {
      PlantData[newLocation][newName]['lastWatered'] = (new Date(lastWatered)).toDateString();
    }
    
    let lastFertilized = $("#newPlantLastFertilized").val();
    if (lastFertilized) {
      PlantData[newLocation][newName]['lastFertilized'] = (new Date(lastFertilized)).toDateString();
    }
    
    PlantData[newLocation][newName]['daysTotal'] = 0;
    PlantData[newLocation][newName]['wateringCount'] = 0;
    let averageDaysBetweenWatering = $("#newPlantAverageWateringDays").val();
    if (averageDaysBetweenWatering) {
      PlantData[newLocation][newName]['daysTotal'] = parseInt(averageDaysBetweenWatering);
      PlantData[newLocation][newName]['wateringCount'] = 1;
    }

    console.log(PlantData[newLocation][newName]);
  
    await saveConfig(PlantData);
    setDisplayForNoPlants();
  }
}
