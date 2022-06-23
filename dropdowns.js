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

const LightList = [
  'Low to medium indirect', 
  'Medium to bright indirect. Tolerates low indirect', 
  'Medium to bright indirect', 
  'Bright indirect. Tolerates medium to low indirect',
  'Bright indirect',
  'Bright indirect to direct',
  'Direct']

const WaterList = [
  'Evenly moist', 
  '1 inch is dry', 
  '1-2 inches are dry', 
  '2-3 inches are dry',
  'Almost completely dry',
  'Completely dry']

function waterDropdown(dropdown) {
  dropdown.empty();
  dropdown.append('<option selected="true">Evenly moist.</option>');
  dropdown.append('<option>1 inch is dry.</option>');
  dropdown.append('<option>1-2 inches are dry.</option>');
  dropdown.append('<option>2-3 inches are dry.</option>');
  dropdown.append('<option>Almost completely dry.</option>');
  dropdown.append('<option>Completely dry.</option>');
  dropdown.prop('selectedIndex', 0);
}

function setupWaterAndLightDropdowns() {
  waterDropdown($('#newPlantWaterNeeds'));

  $('#newPlantLightNeeds').empty();
  $('#newPlantLightNeeds').append($('<option selected="true"></option>').attr('value', LightList[0]).text(LightList[0]));
  $('#newPlantLightNeeds').append($('<option></option>').attr('value', LightList[1]).text(LightList[1]));
  $('#newPlantLightNeeds').append($('<option></option>').attr('value', LightList[2]).text(LightList[2]));
  $('#newPlantLightNeeds').append($('<option></option>').attr('value', LightList[3]).text(LightList[3]));
  $('#newPlantLightNeeds').append($('<option></option>').attr('value', LightList[4]).text(LightList[4]));
  $('#newPlantLightNeeds').append($('<option></option>').attr('value', LightList[5]).text(LightList[5]));
  $('#newPlantLightNeeds').append($('<option></option>').attr('value', LightList[6]).text(LightList[6]));
  $('#newPlantLightNeeds').prop('selectedIndex', 0);
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
    averageDaysBetweenWatering.text(isNaN(info.averageDaysBetweenWatering) ? 'n/a' : Math.floor(info.averageDaysBetweenWatering));
    currentWetness.prop('selectedIndex', info.currentWetness);
    lastChecked.text(info.lastChecked);
    lastWatered.text(info.lastWatered);
    water.text(WaterList[info.water]);
    light.text(LightList[info.light]);
  }
};

function resetPlantInfo() {
  setupCurrentWetness();
  averageDaysBetweenWatering.text('n/a')
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

async function plantSelectionChange() {
   console.log('plant change')
  await loadPlants()
    plant = PlantData[locationDropdown.val()][plantDropdown.val()];
    setPlantInfo(plant);
}

async function locationSelectionChange() {
  await loadPlants()
  console.log('location change')
  console.log(PlantData[locationDropdown.val()])
    resetPlantDropdown();

    Object.keys(PlantData[locationDropdown.val()]).forEach( plant => {
      plantDropdown.append($('<option></option>').attr('value', plant).text(plant));
    });
    
    if (Object.keys(PlantData[locationDropdown.val()]).length === 1) {
      plantDropdown.prop('selectedIndex', 1);
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

