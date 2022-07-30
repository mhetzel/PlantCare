/* <span id="plant-info">
<div><span>Average Days Between Waterings: </span><span id="averageDaysBetweenWatering"></span></div>
<div><span>Current Wetness: </span><select id="currentWetness" onchange="checkPlant()"></select></div>
<div><span>Last Checked Date: </span><span id="lastChecked"></span></div>
<div><span>Last Watered Date: </span><span id="lastWatered"></span></div>
<div><span>Desired Water Level: </span><span id="water"></span></div>
<div><span>Watering Instructions: </span><span id="waterInstructions"></span></div>
<div><span>Soil Preferences: </span><span id="soil"></span></div>
<div><span>Last Fertilized Date: </span><span id="lastFertilized"></span></div>
<div><span>Fertilizer Frequency: </span><span id="fertilzerFrequency"></span></div>
<div><span>Fertilizer Dose: </span><span id="fertilzerDose"></span></div>
<div><span>Pet Safe: </span><span id="petSafe"></span></div>
<div><span>Humidity Needs: </span><span id="humidity"></span></div>
<div><span>Desired Light Level: </span><span id="light"></span></div>
</span>

*/

function displayPlant(element, locationName, plantName) {
  let plantInfo = $('<span></span>');
  let plantButtons = $('<div></div>');
  element.append(plantInfo, plantButtons);

  let waterButton = $('<button onclick="waterPlant()" title="Water Plant"><i class="fa-solid fa-droplet"></i></button>')
  let moveButton = $('<button onclick="toggleMovePlantForm()" title="Move Plant"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>')
  let updateButton = $('<button onclick="toggleUpdatePlantForm()" title="Edit Plant"><i class="fa-solid fa-pencil"></i></button>')
  let deleteButton = $('<button onclick="deletePlant()" title="Delete Plant"><i class="fa-solid fa-trash"></i></button>')

  plantButtons.append(waterButton, moveButton, updateButton, deleteButton);
  
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
    $('#dropdown-plant-info').show();
      
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

  plant = PlantData[locationName][plantName];
  setPlantInfo(plant);
}



