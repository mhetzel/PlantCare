
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

  
  let waterButton = $('<button title="Water Plant"><i class="fa-solid fa-droplet"></i></button>')
  waterButton.on('click', function() {
    waterPlant()
  })
  let fertilizeButton = $('<button title="Fertilize Plant"><i class="fa-solid fa-seedling"></i></button>')
  fertilizeButton.on('click', function() {
    fertilizePlant()
  })
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
    
  function createUpdatePlantForm() {
    $('#update-plant-div').remove()
    let updateDiv = $('<div id="update-plant-div" class="floating-box content-box"></div>')
    let updateForm = $('<form class="form-container" action="javascript:console.log( \'success!\' );">')
    updateDiv.append(updateForm)
    let buttonDiv = $('<div class="top-right"></div>')
    let saveButton = $('<button type="submit" title="Save Plant"><i class="fa-solid fa-floppy-disk"></i></button>')
    saveButton.on('click', function() {
      updatePlant()
    })
    let closeButton = $('<button type="button" title="Close"><i class="fa-solid fa-xmark"></i></button>')
    closeButton.on('click', function() {
      toggleUpdatePlantForm()
    }
    buttonDiv.append(saveButton, closeButton)
    let updateInput = $('<div id="update-plant-input"></div>')
    updateForm.append(buttonDiv, updateInput)
    $("body").append(updateDiv)
    
    addPlantInputFeilds("#update-plant-input", 'updated');
    dropdown('#updated');
    setKnowPlantValues("#updated", plant);
    $("#update-plant-div").show();
  }

  function createMovePlantForm() {
    $('#move-location-div').remove()
    let moveDiv = $('<div id="move-location-div" class="floating-box content-box"></div>')
    let moveForm = $('<form class="form-container" action="javascript:console.log( \'success!\' );">')
    moveDiv.append(moveForm)
    let buttonDiv = $('<div class="top-right"></div>')
    let saveButton = $('<button type="submit" onclick="movePlant()" title="Save Plant"><i class="fa-solid fa-floppy-disk"></i></button>')
    saveButton.on('click', function() {
      movePlant()
    })
    let closeButton = $('<button type="button" title="Close"><i class="fa-solid fa-xmark"></i></button>')
    closeButton.on('click', function() {
      toggleMovePlantForm()
    })
    buttonDiv.append(saveButton, closeButton)
    let moveLabel = $('<label for="movedPlantLocation"><b>New Location:</b></label>')
    let moveInput = $('<input type="text" placeholder="Enter New Plant Location" id="movedPlantLocation" required>')

    moveForm.append(buttonDiv, moveLabel, moveInput)

    $("body").append(moveDiv)
    $("#movedPlantLocation").val(locationName);
    $("#move-location-div").show();
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
  
  async function waterPlant() {
    const today = new Date();
    PlantData[locationName][plantName].lastChecked = today.toDateString();

    const last = 'lastWatered' in PlantData[locationName][plantName] ? new Date(PlantData[locationName][plantName].lastWatered) : today;
    const daysTotal = 'daysTotal' in PlantData[locationName][plantName] ? PlantData[locationName][plantName].daysTotal : 0;
    const wateringCount = 'wateringCount' in PlantData[locationName][plantName] ? PlantData[locationName][plantName].wateringCount : 0;

    PlantData[locationName][plantName].daysTotal = daysTotal + (today - last);
    PlantData[locationName][plantName].wateringCount = wateringCount + 1;
    PlantData[locationName][plantName].lastWatered = today.toDateString();
    PlantData[locationName][plantName].currentWetness = 0;

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
  
  // pop up actions
  function toggleMovePlantForm() {
    if ($("#move-location-div").css('display') == 'block') {
      $("#move-location-div").remove();
    } else {
      createMovePlantForm();
    }
  };

  function toggleUpdatePlantForm() {
    if ($("#update-plant-div").css('display') == 'block') {
      $('#update-plant-div').remove()
    } else {
      createUpdatePlantForm();
    }
  };
  
  async function updatePlant() {
    let plant = PlantData[locationName][plantName];

    let newPlantInfo = readPlantInputs("#updated");
    PlantData[locationName][plantName] = {...PlantData[locationName][plantName], ...newPlantInfo};

    toggleUpdatePlantForm();

    await saveConfig(PlantData);
    resetPlantSelection(location, plantName);
  };

  async function movePlant() {
    let newLocation = $("#movedPlantLocation").val();

    plant = PlantData[locationName][plantName];
    delete PlantData[locationName][plantName];
    if (Object.keys(PlantData[locationName]).length === 0) {
      delete PlantData[locationName];
    }

    if (!PlantData.hasOwnProperty(newLocation)) {
      PlantData[newLocation] = {};
    }

    PlantData[newLocation][plantName] = plant;
    toggleMovePlantForm();
    await saveConfig(PlantData);
    resetPlantSelection(newLocation, plantName);
  };

  
  
} // displayPlant



