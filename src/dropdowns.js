var locationDropdown = $("#location-dropdown");
var plantDropdown = $('#plant-dropdown');

var plantInfo = $('#plant-info');
var plantButtons = $('#plant-buttons');

function dropdown(prefix) {
  $(prefix+'PlantPetSafe').prop('selectedIndex', 0);
  setDropdown($(prefix+'PlantWaterNeeds'), WaterList);
  setDropdown($(prefix+'PlantWaterInstructions'), WateringInstructions);
  setDropdown($(prefix+'PlantSoilPreferences'), SoilList);
  setDropdown($(prefix+'PlantFertilizer'), FertilizerSchedule);
  setDropdown($(prefix+'PlantFertilizerDose'), FertilizerDoses);
  setDropdown($(prefix+'PlantLightNeeds'), LightList);
  setDropdown($(prefix+'PlantHumitidy'), HumidityLevels);
}

function setupUpdatedPlantDropdowns() {
  dropdown('#updated');
}


function setDropdown(dropdown, list) {
  dropdown.empty();
  list.forEach(function(x) {
    dropdown.append($('<option></option>').attr('value', x).text(x));
  });
  dropdown.prop('selectedIndex', 0);
}

function setupCurrentWetness() {
  setDropdown(currentWetness, WaterList);
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
}

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

