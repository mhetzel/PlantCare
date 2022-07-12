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

const WateringInstructions = [
  'Don\'t allow the plant to sit in water.', 
  'Not soggy.', 
  'Water gently from above, soak through to the roots.',
  'Sensitive to Flouride.',
  'Do not allow water to contact the leaves. Water from below.',
]

const SoilList = [
  'cactus potting mix',
  'cactus potting mix with 1:1 perlite',
  'cactus potting mix with added orchard bark and/or perlite',
  'cactus potting mix with added orchard bark, peat moss or vermiculite.',
  'cactus potting mix with added perlite',
  'none',
  'Peat moss-based mix, such as African violet potting mix',
  'perlite/pumice, pine bark, finely shredded spaghum moss and horticultural charcoal.',
]

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

const FertilizerDoses = [
  'None',
  'Half strength',
  'Full strength',  
]

const FertilizerSchedule = [
  'Not needed.',
  'Once a year, in the spring.',
  'Once every 6 months.',
  'Once every 4 months.',
  'Once a month during spring.',
  'Once a month during spring and summer.',
  'Every 2 weeks in spring and summer.',
]

const HumidityLevels = [
  '25%-35%',
  '30%-35%',
  '30%-50%',
  '40% at least',
  '40%-40%',
  '40%-50%',
  '40%-80%',
  '45% at least',
  '45%-65%',
  '50% at least',
  '50%-55%',
  '50%-60%',
  '50%-75%',
  '60%-75%',
  '60%-80%',
  '70%-80%',
  '70%-90%',
  '75%-85%',
]

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
  $('#newPlantSoilPreferences').append($('<option></option>').attr('value', SoilList[0]).text(SoilList[0]));
  $('#newPlantSoilPreferences').append($('<option></option>').attr('value', SoilList[1]).text(SoilList[1]));
  $('#newPlantSoilPreferences').append($('<option></option>').attr('value', SoilList[2]).text(SoilList[2]));
  $('#newPlantSoilPreferences').append($('<option></option>').attr('value', SoilList[3]).text(SoilList[3]));
  $('#newPlantSoilPreferences').append($('<option></option>').attr('value', SoilList[4]).text(SoilList[4]));
  $('#newPlantSoilPreferences').append($('<option></option>').attr('value', SoilList[5]).text(SoilList[5]));
  $('#newPlantSoilPreferences').append($('<option></option>').attr('value', SoilList[6]).text(SoilList[6]));
  $('#newPlantSoilPreferences').append($('<option></option>').attr('value', SoilList[7]).text(SoilList[7]));
  $('#newPlantSoilPreferences').prop('selectedIndex', 0);

  $('#newPlantHumitidy').empty();
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[0]).text(HumidityLevels[0]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[1]).text(HumidityLevels[1]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[2]).text(HumidityLevels[2]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[3]).text(HumidityLevels[3]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[4]).text(HumidityLevels[4]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[5]).text(HumidityLevels[5]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[6]).text(HumidityLevels[6]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[7]).text(HumidityLevels[7]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[8]).text(HumidityLevels[8]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[9]).text(HumidityLevels[9]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[10]).text(HumidityLevels[10]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[11]).text(HumidityLevels[11]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[12]).text(HumidityLevels[12]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[13]).text(HumidityLevels[13]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[14]).text(HumidityLevels[14]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[15]).text(HumidityLevels[15]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[16]).text(HumidityLevels[16]));
  $('#newPlantHumitidy').append($('<option></option>').attr('value', HumidityLevels[17]).text(HumidityLevels[17]));
  $('#newPlantHumitidy').prop('selectedIndex', 0);

  $('#newPlantFertilizer').empty();
  $('#newPlantFertilizer').append($('<option></option>').attr('value', FertilizerSchedule[0]).text(FertilizerSchedule[0]));
  $('#newPlantFertilizer').append($('<option></option>').attr('value', FertilizerSchedule[1]).text(FertilizerSchedule[1]));
  $('#newPlantFertilizer').append($('<option></option>').attr('value', FertilizerSchedule[2]).text(FertilizerSchedule[2]));
  $('#newPlantFertilizer').append($('<option></option>').attr('value', FertilizerSchedule[3]).text(FertilizerSchedule[3]));
  $('#newPlantFertilizer').append($('<option></option>').attr('value', FertilizerSchedule[4]).text(FertilizerSchedule[4]));
  $('#newPlantFertilizer').append($('<option></option>').attr('value', FertilizerSchedule[5]).text(FertilizerSchedule[5]));
  $('#newPlantFertilizer').append($('<option></option>').attr('value', FertilizerSchedule[6]).text(FertilizerSchedule[6]));
  $('#newPlantFertilizer').prop('selectedIndex', 0);

  $('#newPlantFertilizerDose').empty();
  $('#newPlantFertilizerDose').append($('<option></option>').attr('value', FertilizerDoses[0]).text(FertilizerDoses[0]));
  $('#newPlantFertilizerDose').append($('<option></option>').attr('value', FertilizerDoses[1]).text(FertilizerDoses[1]));
  $('#newPlantFertilizerDose').append($('<option></option>').attr('value', FertilizerDoses[2]).text(FertilizerDoses[2]));
  $('#newPlantFertilizerDose').prop('selectedIndex', 0);

  waterDropdown($('#newPlantWaterNeeds'));

  $('#newPlantLightNeeds').empty();
  $('#newPlantLightNeeds').append($('<option></option>').attr('value', LightList[0]).text(LightList[0]));
  $('#newPlantLightNeeds').append($('<option></option>').attr('value', LightList[1]).text(LightList[1]));
  $('#newPlantLightNeeds').append($('<option></option>').attr('value', LightList[2]).text(LightList[2]));
  $('#newPlantLightNeeds').append($('<option></option>').attr('value', LightList[3]).text(LightList[3]));
  $('#newPlantLightNeeds').append($('<option></option>').attr('value', LightList[4]).text(LightList[4]));
  $('#newPlantLightNeeds').append($('<option></option>').attr('value', LightList[5]).text(LightList[5]));
  $('#newPlantLightNeeds').append($('<option></option>').attr('value', LightList[6]).text(LightList[6]));
  $('#newPlantLightNeeds').prop('selectedIndex', 0);
  
  $( ".multiselect-dropdown").css('width') = '100%';
}

function waterDropdown(dropdown) {
  dropdown.empty();
  dropdown.append($('<option></option>').attr('value', WaterList[0]).text(WaterList[0]));
  dropdown.append($('<option></option>').attr('value', WaterList[1]).text(WaterList[1]));
  dropdown.append($('<option></option>').attr('value', WaterList[2]).text(WaterList[2]));
  dropdown.append($('<option></option>').attr('value', WaterList[3]).text(WaterList[3]));
  dropdown.append($('<option></option>').attr('value', WaterList[4]).text(WaterList[4]));
  dropdown.append($('<option></option>').attr('value', WaterList[5]).text(WaterList[5]));
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

