/* <span id="plant-info">

</span>

*/

function displayPlant(element, locationName, plantName) {
  element.empty();
  let plantInfo = $('<span></span>');
  let plantButtons = $('<div></div>');
  element.append(plantInfo, plantButtons);

  var averageDaysBetweenWatering = $('<span id="averageDaysBetweenWatering"></span>');
  
  var currentWetness = $('<select id="currentWetness"></select>');
  currentWetness.on('change', function() {
    checkPlant();
  });
    
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

  plantInfo.append($('<div><span><b>Average Days Between Waterings: </b></span></div>').append(averageDaysBetweenWatering))
  plantInfo.append($('<div><span><b>Current Wetness: </b></span></div>').append(currentWetness))
  plantInfo.append($('<div><span><b>Last Checked Date: </b></span></div>').append(lastChecked))
  plantInfo.append($('<div><span><b>Last Watered Date: </b></span></div>').append(lastWatered))
  plantInfo.append($('<div><span><b>Desired Water Level: </b></span></div>').append(water))
  plantInfo.append($('<div><span><b>Watering Instructions: </b></span></div>').append(waterInstructions))
  plantInfo.append($('<div><span><b>Soil Preferences: </b></span></div>').append(soil))
  plantInfo.append($('<div><span><b>Last Fertilized Date: </b></span></div>').append(lastFertilized))
  plantInfo.append($('<div><span><b>Fertilizer Frequency: </b></span></div>').append(fertilzerFrequency))
  plantInfo.append($('<div><span><b>Fertilizer Dose: </b></span></div>').append(fertilzerDose))
  plantInfo.append($('<div><span><b>Pet Safe: </b></span></div>').append(petSafe))
  plantInfo.append($('<div><span><b>Humidity Needs: </b></span></div>').append(humidity))
  plantInfo.append($('<div><span><b>Desired Light Level: </b></span></div>').append(light))


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
  
    
  async function checkPlant() {
    const today = new Date();
    PlantData[locationName][plantName].lastChecked = today.toDateString();

    PlantData[locationName][plantName].currentWetness = currentWetness.prop('selectedIndex');
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
    let location = locationDropdown.val();
    $("#movedPlantLocation").val(location);

    if ($("#move-location-div").css('display') == 'block') {
      $("#move-location-div").hide();
    } else {
      $("#move-location-div").show();
    }
  };

  function toggleUpdatePlantForm() {
    let location = locationDropdown.val();
    let plantName = plantDropdown.val();
    let plant = PlantData[location][plantName];

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



