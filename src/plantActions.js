
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

  addPlantInputFeilds("#update-plant-input", 'updated');
  dropdown('#updated');

  // todo multiselect set isn't working

  $("#updatedPlantWaterNeeds").prop('selectedIndex', plant['water']);
  $("#updatedPlantWaterInstructions").val(plant['waterInstructions']);
  $("#updatedPlantSoilPreferences").val(plant['soil']);
  $("#updatedPlantFertilizer").val(plant['fertilzerFrequency']);
  $("#updatedPlantFertilizerDose").val(plant['fertilzerDose']);
  $("#updatedPlantLightNeeds").prop('selectedIndex', plant['light']);
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
