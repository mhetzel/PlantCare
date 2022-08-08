

function displayPlant(element, locationName, plantName) {
  element.empty();
  const plantInfo = $('<span></span>');
  const plantButtons = $('<div></div>');
  element.append(plantInfo, plantButtons);
  
  const today = new Date();
  var plant = PlantData[locationName][plantName];

  var displayExtraInfo = false;


  var currentWetness = $('<select id="currentWetness"></select>');
  currentWetness.on('change', function() {
    checkPlant();
  });
  setDropdown(currentWetness, WaterList);
  var averageDaysBetweenWatering = $('<span id="averageDaysBetweenWatering"></span>');
  averageDaysBetweenWatering.text('n/a');
  var lastChecked = $('<span id="lastChecked"></span>');
  lastChecked.text('n/a');
  var nextCheck = $('<span id="nextCheck"></span>');
  nextCheck.text('n/a');
  var lastWatered = $('<span id="lastWatered"></span>');
  lastWatered.text('n/a');
  var nextWatering = $('<span id="nextWatering"></span>');
  nextWatering.text('n/a');
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
  
  var waterWarning = $('<i style="color: #9c6e60" class="fa-solid fa-triangle-exclamation"></i>')
  var checkWarning = $('<i style="color: #9c6e60" class="fa-solid fa-triangle-exclamation"></i>')
  var fertilizeWarning = $('<i style="color: #9c6e60" class="fa-solid fa-triangle-exclamation"></i>')
  var expandIcon = $('<i class="fa-solid fa-angle-right"></i>')
  var expandedIcon = $('<i class="fa-solid fa-angle-down"></i>')

  plantInfo.append($('<div><span><b>Next Watering Date: </b></span></div>').append(nextWatering))
  plantInfo.append($('<div><span><b>Current Wetness: </b></span></div>').append(currentWetness))
  plantInfo.append($('<div><span><b>Next Check Date: </b></span></div>').append(nextCheck))
  
  let extraDiv = $('<div></div>')
  extraDiv.append($('<div><span><b>Average Days Between Waterings: </b></span></div>').append(averageDaysBetweenWatering))
  extraDiv.append($('<div><span><b>Last Checked Date: </b></span></div>').append(lastChecked))
  extraDiv.append($('<div><span><b>Last Watered Date: </b></span></div>').append(lastWatered))
  extraDiv.append($('<div><span><b>Last Fertilized Date: </b></span></div>').append(lastFertilized))
  extraDiv.append($('<div><span><b>Desired Water Level: </b></span></div>').append(water))
  extraDiv.append($('<div><span><b>Watering Instructions: </b></span></div>').append(waterInstructions))
  extraDiv.append($('<div><span><b>Soil Preferences: </b></span></div>').append(soil))
  extraDiv.append($('<div><span><b>Fertilizer Frequency: </b></span></div>').append(fertilzerFrequency))
  extraDiv.append($('<div><span><b>Fertilizer Dose: </b></span></div>').append(fertilzerDose))
  extraDiv.append($('<div><span><b>Pet Safe: </b></span></div>').append(petSafe))
  extraDiv.append($('<div><span><b>Humidity Needs: </b></span></div>').append(humidity))
  extraDiv.append($('<div><span><b>Desired Light Level: </b></span></div>').append(light))

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
  let toggleInfoButton = $('<button title="Colapse/Expand Aditional Plnat Info"></button>')
  toggleInfoButton.append(expandIcon);
  toggleInfoButton.on('click', function() {
    togglePlantInfo()
  })

  plantButtons.append(waterButton, fertilizeButton, moveButton, updateButton, deleteButton, toggleInfoButton);
  
  if (Object.keys(plant).length) {
    setNextDates();
    
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
  
  needsWatered();
  needsFertilized();
  needsChecked();
  element.show();

  function setNextDates() {
    let average = PlantData[locationName][plantName].daysTotal/PlantData[locationName][plantName].wateringCount;
    if (!isNaN(average)) {
      let nextWateringDate = new Date(PlantData[locationName][plantName].lastWatered);
      let nextCheckDate = new Date(PlantData[locationName][plantName].lastChecked);
      average = Math.floor(average);
      averageDaysBetweenWatering.text(average);
      nextWateringDate.setDate(nextWateringDate.getDate() + average);
      nextWatering.text(nextWateringDate.toDateString());

      let diffDays = parseInt((nextWateringDate - nextCheckDate) / (1000 * 60 * 60 * 24), 10);
      diffDays = diffDays > 0 ? diffDays : average;
      nextCheckDate.setDate(nextCheckDate.getDate() + Math.floor(diffDays/2))
      nextCheck.text(nextCheckDate.toDateString())
    }
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
    })
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
    PlantData[locationName][plantName].lastChecked = today.toDateString();
    PlantData[locationName][plantName].currentWetness = currentWetness.prop('selectedIndex');

    await saveConfig(PlantData);
    resetPlantSelection(locationName, plantName);
    plant = PlantData[locationName][plantName];
    setNextDates();
    checkWarning.remove();
  };
  
  async function fertilizePlant() {
    PlantData[locationName][plantName].lastFertilized = today.toDateString();

    await saveConfig(PlantData);
    resetPlantSelection(locationName, plantName);
    plant = PlantData[locationName][plantName];
  };
  
  async function waterPlant() {
    PlantData[locationName][plantName].lastChecked = today.toDateString();
  
    const last = plant.hasOwnProperty('lastWatered') ? new Date(plant.lastWatered) : today;
    const daysTotal = plant.hasOwnProperty('daysTotal') ? plant.daysTotal : 0;
    const wateringCount = plant.hasOwnProperty('wateringCount') ? plant.wateringCount : 0;
    let differenceInDays =  (today - last)/ (1000 * 3600 * 24)

    PlantData[locationName][plantName].daysTotal = daysTotal + differenceInDays;
    PlantData[locationName][plantName].wateringCount = wateringCount + 1;
    PlantData[locationName][plantName].lastWatered = today.toDateString();
    PlantData[locationName][plantName].currentWetness = 0;
    await saveConfig(PlantData);
    resetPlantSelection(locationName, plantName);
    
    plant = PlantData[locationName][plantName];
    setNextDates();
    waterWarning.remove();
    checkWarning.remove();
  };
  
  async function deletePlant() {
    delete PlantData[locationName][plantName];
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
  
  function togglePlantInfo() {
    if (displayExtraInfo) {
      displayExtraInfo = false;
      expandedIcon.remove()
      toggleInfoButton.append(expandIcon);
      extraDiv.remove()
    } else {
      displayExtraInfo = true;
      expandIcon.remove()
      toggleInfoButton.append(expandedIcon);
      plantInfo.append(extraDiv)
    }
  }

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


  function needsWatered() {
    if (doesPlantNeedWatered(locationName, plantName)) {
      console.log(plantName, 'at', locationName, 'needs watered because its drier than it should be', plant.currentWetness, plant.water)
      waterWarning.insertBefore(nextWatering);
    }
  }
  
  function needsFertilized() {
    console.log(plantName, 'at', locationName, 'needs fertilized because its been the right length of time between doses')
  }
  
  function needsChecked() {
    if (doesPlantNeedChecked(locationName, plantName)) {
      checkWarning.insertBefore(nextCheck);
    }
  }
  
} // displayPlant

