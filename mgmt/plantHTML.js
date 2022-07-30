/* <span id="plant-info">

</span>

*/

function displayPlant(element, locationName, plantName) {
  element.empty();
  let plantInfo = $('<span></span>');
  let plantButtons = $('<div></div>');
  element.append(plantInfo, plantButtons);

  var averageDaysBetweenWatering = $('<span id="averageDaysBetweenWatering"></span>');
  var currentWetness = $('<select id="currentWetness" onchange="checkPlant()"></select>');
  var lastChecked = $('<span id="lastChecked"></span>');
  var lastWatered = $('<span id="lastWatered"></span>');
  var lastFertilized = $('<span id="lastFertilized"></span>');
  var water = $('<span id="water"></span>');
  var waterInstructions = $('<span id="waterInstructions"></span>');
  var soil = $('<span id="soil"></span>');
  var fertilzerFrequency = $('<span id="fertilzerFrequency"></span>');
  var fertilzerDose = $('<span id="fertilzerDose"></span>');
  var petSafe = $('<span id="petSafe"></span>');
  var humidity = $('<span id="humidity"></span>');
  var light = $('<span id="light"></span>');

  plantInfo.append($('<div><span>Average Days Between Waterings: </span></div>').append(averageDaysBetweenWatering))
  plantInfo.append($('<div><span>Current Wetness: </span></div>').append(currentWetness))
  plantInfo.append($('<div><span>Last Checked Date: </span></div>').append(lastChecked))
  plantInfo.append($('<div><span>Last Watered Date: </span></div>').append(lastWatered))
  plantInfo.append($('<div><span>Desired Water Level: </span></div>').append(water))
  plantInfo.append($('<div><span>Watering Instructions: </span></div>').append(waterInstructions))
  plantInfo.append($('<div><span>Soil Preferences: </span></div>').append(soil))
  plantInfo.append($('<div><span>Last Fertilized Date: </span></div>').append(lastFertilized))
  plantInfo.append($('<div><span>Fertilizer Frequency: </span></div>').append(fertilzerFrequency))
  plantInfo.append($('<div><span>Fertilizer Dose: </span></div>').append(fertilzerDose))
  plantInfo.append($('<div><span>Pet Safe: </span></div>').append(petSafe))
  plantInfo.append($('<div><span>Humidity Needs: </span></div>').append(humidity))
  plantInfo.append($('<div><span>Desired Light Level: </span></div>').append(light))


  let waterButton = $('<button onclick="waterPlant()" title="Water Plant"><i class="fa-solid fa-droplet"></i></button>')
  let moveButton = $('<button onclick="toggleMovePlantForm()" title="Move Plant"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>')
  let updateButton = $('<button onclick="toggleUpdatePlantForm()" title="Edit Plant"><i class="fa-solid fa-pencil"></i></button>')
  let deleteButton = $('<button onclick="deletePlant()" title="Delete Plant"><i class="fa-solid fa-trash"></i></button>')

  plantButtons.append(waterButton, moveButton, updateButton, deleteButton);
  


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



