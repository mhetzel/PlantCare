var plantInfo = $('#plant-info');
var plantButtons = $('#plant-buttons');


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

function hidePlantInfo() {
  plantInfo.hide();
  plantButtons.hide();
}

function resetPlantInfo() {
  setDropdown(currentWetness, WaterList);
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

function setPlantInfo(info) {
  resetPlantInfo();
  plantInfo.show();
  plantButtons.show();
    
  if (Object.keys(info).length) {
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
