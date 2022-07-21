var locationDropdown = $("#location-dropdown");
var plantDropdown = $('#plant-dropdown');

var plantInfo = $('#plant-info');
var plantButtons = $('#plant-buttons');

// TODO share these two
function setupUpdatedPlantDropdowns() {
  $('#updatedPlantPetSafe').prop('selectedIndex', 0);
  setDropdown($('#updatedPlantWaterNeeds'), WaterList);
  setDropdown($('#updatedPlantWaterInstructions'), WateringInstructions);
  setDropdown($('#updatedPlantSoilPreferences'), SoilList);
  setDropdown($('#updatedPlantFertilizer'), FertilizerSchedule);
  setDropdown($('#updatedPlantFertilizerDose'), FertilizerDoses);
  setDropdown($('#updatedPlantLightNeeds'), LightList);
  setDropdown($('#updatedPlantHumitidy'), HumidityLevels);
}

function setupNewPlantInput() {

  $("#newPlantName").val('');
  $("#newPlantLocation").val('');
  $("#newPlantLastWatered").val(null);
  $("#newPlantAverageWateringDays").val(null);


  $('#newPlantPetSafe').prop('selectedIndex', 0);
  setDropdown($('#newPlantWaterNeeds'), WaterList);
  setDropdown($('#newPlantWaterInstructions'), WateringInstructions);
  setDropdown($('#newPlantSoilPreferences'), SoilList);
  setDropdown($('#newPlantFertilizer'), FertilizerSchedule);
  setDropdown($('#newPlantFertilizerDose'), FertilizerDoses);
  setDropdown($('#newPlantLightNeeds'), LightList);
  setDropdown($('#newPlantHumitidy'), HumidityLevels);
};

function setDropdown(dropdown, list) {
  dropdown.empty();
  list.forEach(function(x) {
    dropdown.append($('<option></option>').attr('value', x).text(x));
  });
  dropdown.prop('selectedIndex', 0);
};

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

