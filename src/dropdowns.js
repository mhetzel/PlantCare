var locationDropdown = $("#location-dropdown");
var plantDropdown = $('#plant-dropdown');

var plantInfo = $('#plant-info');
var plantButtons = $('#plant-buttons');

function knownPlantSelectionChange() {
  setupNewPlantInput();
  $.getJSON('src/knownPlants.json', function(data) {
    plant = data.knownPlants[$("#known-plant").val()]
    if (plant.hasOwnProperty('daysTotal')) {
      $("#newPlantAverageWateringDays").val(plant['daysTotal']);
    }
    $("#newPlantWaterNeeds").prop('selectedIndex', plant['water']);
    $("#newPlantWaterInstructions").val(plant['waterInstructions']);
    $("#newPlantSoilPreferences").val(plant['soil']);
    $("#newPlantFertilizer").val(plant['fertilzerFrequency']);
    $("#newPlantFertilizerDose").val(plant['fertilzerDose']);
    $("#newPlantLightNeeds").prop('selectedIndex', plant['light']);
    $("#newPlantPetSafe").val(plant['petSafe']);
    $("#newPlantHumitidy").val(plant['humidity']);
  });
}

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

function setupNewPlantInput() {
  $("#newPlantName").val('');
  $("#newPlantLocation").val('');
  $("#newPlantLastWatered").val(null);
  $("#newPlantAverageWateringDays").val(null);

  dropdown('#new');
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
