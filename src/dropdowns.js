var locationDropdown = $("#location-dropdown");
var plantDropdown = $('#plant-dropdown');

function setKnownPlantDropdown() {
  $.getJSON('src/knownPlants.json', function(data) {
     $.each(data, function(i, f) {
         $("#known-plant").append($('<option></option>').attr('value', i).text(i));
     });
  });
}

function knownPlantSelectionChange() {
  setupNewPlantInput();
  $.getJSON('src/knownPlants.json', function(data) {
    plant = data[$("#known-plant").val()]
    if (plant.hasOwnProperty('daysTotal')) {
      $("#newPlantAverageWateringDays").val(plant['daysTotal']);
    }
    setKnownPlantValues("#new", plant);
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
  
  $('select[multiple]').multiselect('reload')
}

function setDropdown(dropdown, list) {
  dropdown.empty();
  list.forEach(function(x) {
    dropdown.append($('<option></option>').attr('value', x).text(x));
  });
  dropdown.prop('selectedIndex', 0);
}

function resetPlantSelection(location, plant) {
  locationDropdown.val(location);
  locationSelectionChange();
  plantDropdown.val(plant);
  plantSelectionChange();
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
  $('#dropdown-plant-info').hide();
}

function plantSelectionChange() {
  let location = locationDropdown.val();
  let plantName = plantDropdown.val();
  
  if (plantName === 'All') {
    console.log('all for', location)
    showAllPlantsForLocation($("#dropdown-plant-info"), location)
  } else {
    displayPlant($("#dropdown-plant-info"), location, plantName, true);
  }
}

function locationSelectionChange() {
  resetPlantDropdown();
  let location = locationDropdown.val();
  if (location === 'All') {
    console.log('all locations and plants')
    let allPlantsDiv = $("#dropdown-plant-info")
    allPlantsDiv.empty()
    Object.keys(PlantData).forEach( location => {
      let plantsDiv = $('<div></div>')
      showAllPlantsForLocation(plantsDiv, location)
      allPlantsDiv.append(plantsDiv)
    });
    allPlantsDiv.show()
  } else {
    plantDropdown.append($('<option></option>').attr('value', 'All').text('All'));

    Object.keys(PlantData[location]).forEach( plant => {
      plantDropdown.append($('<option></option>').attr('value', plant).text(plant));
    });

    if (Object.keys(PlantData[location]).length === 1) {
      plantDropdown.prop('selectedIndex', 1);
      plantSelectionChange();
    }
  }
}

async function setupDropDowns() {
  if (PlantData) {
    if (Object.keys(PlantData).length > 0) {
      locationDropdown.append($('<option></option>').attr('value', 'All').text('All'));
    }
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
