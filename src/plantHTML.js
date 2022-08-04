/* <span id="plant-info">

</span>

*/

function displayPlant(element, locationName, plantName) {
  element.empty();
  let plantInfo = $('<span></span>');
  let plantButtons = $('<div></div>');
  element.append(plantInfo, plantButtons);
  
  let plant = PlantData[locationName][plantName];
  
  
  
  var currentWetness = $('<select id="currentWetness"></select>');
  currentWetness.on('change', function() {
    checkPlant();
  });
  setDropdown(currentWetness, WaterList);
  
  var averageDaysBetweenWatering = $('<span id="averageDaysBetweenWatering"></span>');
  averageDaysBetweenWatering.text('n/a');
  var lastChecked = $('<span id="lastChecked"></span>');
  lastChecked.text('n/a');
  var lastWatered = $('<span id="lastWatered"></span>');
  lastWatered.text('n/a');
  var lastFertilized = $('<span id="lastFertilized"></span>');
  lastFertilized.text('n/a');
  var water = $('<span id="water"></span>');
  water.text('n/a');
  var waterInstructions = $('<span id="waterInstructions"></span>');
  waterInstructions.text('n/a');
  var soil = $('<span id="soil"></span>');
  soil.text('n/a');
  var fertilzerFrequency = $('<span id="fertilzerFrequency"></span>');
  fertilzerFrequency.text('n/a');
  var fertilzerDose = $('<span id="fertilzerDose"></span>');
  fertilzerDose.text('n/a');
  var petSafe = $('<span id="petSafe"></span>');
  petSafe.text('n/a');
  var humidity = $('<span id="humidity"></span>');
  humidity.text('n/a');
  var light = $('<span id="light"></span>');  
  light.text('n/a');
    
  plantInfo.append($('<div><span><b>Average Days Between Waterings: </b></span></div>').append(averageDaysBetweenWatering))
  plantInfo.append($('<div><span><b>Current Wetness: </b></span></div>').append(currentWetness))
  plantInfo.append($('<div><span><b>Last Checked Date: </b></span></div>').append(lastChecked))
  plantInfo.append($('<div><span><b>Last Watered Date: </b></span></div>').append(lastWatered))
  plantInfo.append($('<div><span><b>Last Fertilized Date: </b></span></div>').append(lastFertilized))
  plantInfo.append($('<div><span><b>Desired Water Level: </b></span></div>').append(water))
  plantInfo.append($('<div><span><b>Watering Instructions: </b></span></div>').append(waterInstructions))
  
  plantInfo.append($('<div><span><b>Soil Preferences: </b></span></div>').append(soil))
  plantInfo.append($('<div><span><b>Fertilizer Frequency: </b></span></div>').append(fertilzerFrequency))
  plantInfo.append($('<div><span><b>Fertilizer Dose: </b></span></div>').append(fertilzerDose))
  plantInfo.append($('<div><span><b>Pet Safe: </b></span></div>').append(petSafe))
  plantInfo.append($('<div><span><b>Humidity Needs: </b></span></div>').append(humidity))
  plantInfo.append($('<div><span><b>Desired Light Level: </b></span></div>').append(light))

  
  let waterButton = $('<button onclick="waterPlant()" title="Water Plant"><i class="fa-solid fa-droplet"></i></button>')
  let fertilizeButton = $('<button onclick="fertilizePlant()" title="Fertilize Plant"><i class="fa-solid fa-seedling"></i></button>')
  let moveButton = $('<button title="Move Plant"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>')
  moveButton.on('click', function() {
     toggleMovePlantForm()
  });
  let updateButton = $('<button title="Edit Plant"><i class="fa-solid fa-pencil"></i></button>')
  updateButton.on('click', function() {
    toggleUpdatePlantForm()
  })
  let deleteButton = $('<button title="Delete Plant"><i class="fa-solid fa-trash"></i></button>')
  deleteButton.on('click', function() {
    deletePlant()
  })

  plantButtons.append(waterButton, fertilizeButton, moveButton, updateButton, deleteButton);
  
  if (Object.keys(plant).length) {
    let average = plant.daysTotal/plant.wateringCount;
    averageDaysBetweenWatering.text(isNaN(average) ? 'n/a' : Math.floor(average));
    currentWetness.prop('selectedIndex', plant.currentWetness);
    lastChecked.text(plant.lastChecked);
    lastWatered.text(plant.lastWatered);
    water.text(WaterList[plant.water]);
    light.text(LightList[plant.light]);
    waterInstructions.text(plant.waterInstructions);
    soil.text(plant.soil);
    lastFertilized.text(plant.lastFertilized);
    fertilzerFrequency.text(plant.fertilzerFrequency);
    fertilzerDose.text(plant.fertilzerDose);
    petSafe.text(plant.petSafe);
    humidity.text(plant.humidity);
  }
    
  async function checkPlant() {
    const today = new Date();
    PlantData[locationName][plantName].lastChecked = today.toDateString();

    PlantData[locationName][plantName].currentWetness = currentWetness.prop('selectedIndex');
    await saveConfig(PlantData);
    resetPlantSelection(locationName, plantName);
  };
  
  async function fertilizePlant() {
    const today = new Date();
    PlantData[locationName][plantName].lastFertilized = today.toDateString();

    await saveConfig(PlantData);
    resetPlantSelection(locationName, plantName);
  };
  
  async function deletePlant() {
    delete PlantData[locationName][locationName];
    if (Object.keys(PlantData[locationName]).length === 0) {
      delete PlantData[locationName];
    }
    await saveConfig(PlantData);
  };
  
  function toggleMovePlantForm() {
    $("#movedPlantLocation").val(locationName);

    if ($("#move-location-div").css('display') == 'block') {
      $("#move-location-div").hide();
    } else {
      $("#move-location-div").show();
    }
  };

  function toggleUpdatePlantForm() {
    addPlantInputFeilds("#update-plant-input", 'updated');
    dropdown('#updated');

    setKnowPlantValues("#updated", plant);

    if ($("#update-plant-div").css('display') == 'block') {
      $("#update-plant-div").hide();
    } else {
      $("#update-plant-div").show();
    }
  };

}



