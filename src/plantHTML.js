

function displayPlant(element, locationName, plantName, allOptions) {
  element.empty();
  const plantHeading = $('<h4>'+plantName+'</h4>')
  const plantInfo = $('<span></span>');
  const plantButtons = $('<div></div>');
  element.append(plantHeading, plantInfo, plantButtons);
  
  const today = new Date();
  var displayExtraInfo = false;

  var currentWetness = $('<select id="currentWetness"></select>');
  currentWetness.on('change', function() {
    checkPlant();
  });
  setDropdown(currentWetness, WaterList);
  currentWetness.append($('<option></option>').attr('value', 'Same').text('Same'));
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
  var waterAmount = $('<span id="waterAmount"></span>');
  waterAmount.text('n/a');
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
     
  let waterDiv = $('<div></div>')
  waterDiv.append($('<div><span><b>Last Watered Date: </b></span></div>').append(lastWatered))
  waterDiv.append($('<div><span><b>Next Watering Date: </b></span></div>').append(nextWatering))
  waterDiv.append($('<div><span><b>Average Days Between Waterings: </b></span></div>').append(averageDaysBetweenWatering))
  waterDiv.append($('<div><span><b>Last Checked Date: </b></span></div>').append(lastChecked))
  waterDiv.append($('<div><span><b>Current Wetness: </b></span></div>').append(currentWetness))
  waterDiv.append($('<div><span><b>Next Check Date: </b></span></div>').append(nextCheck))
  waterDiv.append($('<div><span><b>Desired Water Level: </b></span></div>').append(water))
  waterDiv.append($('<div><span><b>Watering Amount: </b></span></div>').append(waterAmount))
  waterDiv.append($('<div><span><b>Watering Instructions: </b></span></div>').append(waterInstructions))

  let fertilizerDiv = $('<div></div>')
  fertilizerDiv.append($('<div><span><b>Last Fertilized Date: </b></span></div>').append(lastFertilized))
  fertilizerDiv.append($('<div><span><b>Fertilizer Frequency: </b></span></div>').append(fertilzerFrequency))
  fertilizerDiv.append($('<div><span><b>Fertilizer Dose: </b></span></div>').append(fertilzerDose))
  
  if (allOptions) {
    plantInfo.append(waterDiv)
    plantInfo.append(fertilizerDiv)
  } else {
    if (needsWatered()) {
      plantInfo.append(waterDiv)
      if (needsFertilized()) {
        plantInfo.append(fertilizerDiv)
      }
    } else {
      let checkDiv = $('<div></div>')
      checkDiv.append($('<div><span><b>Last Checked Date: </b></span></div>').append(lastChecked))
      checkDiv.append($('<div><span><b>Current Wetness: </b></span></div>').append(currentWetness))
      checkDiv.append($('<div><span><b>Next Check Date: </b></span></div>').append(nextCheck))
      plantInfo.append(checkDiv)
    }    
  }

    
  let extraDiv = $('<div></div>')
  extraDiv.append($('<div><span><b>Soil Preferences: </b></span></div>').append(soil))
  extraDiv.append($('<div><span><b>Pet Safe: </b></span></div>').append(petSafe))
  extraDiv.append($('<div><span><b>Humidity Needs: </b></span></div>').append(humidity))
  extraDiv.append($('<div><span><b>Desired Light Level: </b></span></div>').append(light))

  let waterButton = $('<button title="Water Plant"><i class="fa-solid fa-droplet"></i></button>')
  waterButton.on('click', function() {
    waterPlant()
  })
  let fertilizeButton = $('<button title="Fertilize Plant"><i class="fa-solid fa-vial"></i></button>')
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
  let toggleInfoButton = $('<button title="Colapse/Expand Aditional Plant Info"></button>')
  toggleInfoButton.append(expandIcon);
  toggleInfoButton.on('click', function() {
    togglePlantInfo()
  })

  if (allOptions) {
    plantButtons.append(waterButton, fertilizeButton, moveButton, updateButton, deleteButton, toggleInfoButton);
  }
  else {
    if (needsWatered()) {
      plantButtons.append(waterButton)
      if (needsFertilized()) {
        plantButtons.append(fertilizeButton)
      }
    }

  }
  
  if (Object.keys(PlantData[locationName][plantName]).length) {
    setNextDates();
    
    currentWetness.prop('selectedIndex', PlantData[locationName][plantName].currentWetness);
    lastChecked.text(PlantData[locationName][plantName].lastChecked);
    lastWatered.text(PlantData[locationName][plantName].lastWatered);
    
    water.text(WaterList[PlantData[locationName][plantName].water]);
    light.text(LightList[PlantData[locationName][plantName].light]);
    waterInstructions.text(PlantData[locationName][plantName].waterInstructions);
    soil.text(PlantData[locationName][plantName].soil);
    lastFertilized.text(PlantData[locationName][plantName].lastFertilized);
    fertilzerFrequency.text(PlantData[locationName][plantName].fertilzerFrequency);
    fertilzerDose.text(PlantData[locationName][plantName].fertilzerDose);
    petSafe.text(PlantData[locationName][plantName].petSafe);
    humidity.text(PlantData[locationName][plantName].humidity);
  }
  
  needsWatered();
  needsFertilized();
  needsChecked();
  element.show();

  function setNextDates() {
    averageDaysBetweenWatering.text(PlantData[locationName][plantName].average);
    
    let nextWateringDate = getNextWaterDate(locationName, plantName)
    let nextCheckDate = getNextCheckDate(locationName, plantName)
    nextWatering.text(nextWateringDate.toDateString());
    nextCheck.text(nextCheckDate.toDateString())
  }
    
  function createUpdatePlantForm() {
    $('#update-plant-div').remove()
    let updateDiv = $('<div id="update-plant-div" class="floating-box content-box"></div>')
    let updateForm = $('<form class="form-container" action="javascript:console.log( \'success!\' );">')
    updateDiv.append(updateForm)
    let buttonDiv = $('<div class="top-right"></div>')
    let saveButton = $('<button type="submit" title="Save Plant"><i class="fa-solid fa-floppy-disk"></i></button>')
    let closeButton = $('<button type="button" title="Close"><i class="fa-solid fa-xmark"></i></button>')
    saveButton.on('click', function() {
      updatePlant()
    })
    closeButton.on('click', function() {
      toggleUpdatePlantForm()
    })
    buttonDiv.append(saveButton, closeButton)
    let updateInput = $('<div id="update-plant-input"></div>')
    updateForm.append(buttonDiv, updateInput)
    $("#display-plant-div").append(updateDiv)
    
    addPlantInputFeilds("#update-plant-input", 'updated');
    dropdown('#updated');
    setKnownPlantValues("#updated", PlantData[locationName][plantName]);
    $("#update-plant-div").show();
  }

  function createMovePlantForm() {
    $('#move-location-div').remove()
    let moveDiv = $('<div id="move-location-div" class="floating-box content-box"></div>')
    let moveForm = $('<form class="form-container" action="javascript:console.log( \'success!\' );">')
    moveDiv.append(moveForm)
    let buttonDiv = $('<div class="top-right"></div>')
    let saveButton = $('<button type="submit" title="Save Plant"><i class="fa-solid fa-floppy-disk"></i></button>')
    let closeButton = $('<button type="button" title="Close"><i class="fa-solid fa-xmark"></i></button>')
    saveButton.on('click', function() {
      movePlant()
    })
    closeButton.on('click', function() {
      toggleMovePlantForm()
    })
    buttonDiv.append(saveButton, closeButton)
    let moveLabel = $('<label for="movedPlantLocation"><b>New Location:</b></label>')
    let moveInput = $('<input type="text" placeholder="Where is your plant now?" list="known-locations" id="movedPlantLocation" required>')
 
    moveForm.append(buttonDiv, moveLabel, moveInput)

    $("#display-plant-div").append(moveDiv)
    $("#movedPlantLocation").val(locationName);
    $("#move-location-div").show();
  }
  
  async function checkPlant() {
    PlantData[locationName][plantName].lastChecked = today.toDateString();
    if (currentWetness.val() != 'Same') {
      PlantData[locationName][plantName].currentWetness = currentWetness.prop('selectedIndex');
    } else {
      console.log(plantName, 'still at', WaterList[PlantData[locationName][plantName].currentWetness])
      currentWetness.prop('selectedIndex', PlantData[locationName][plantName].currentWetness)
    }
    
    
    setNextDates();
    checkWarning.remove();
    
    if (allOptions) {
      await saveConfig(PlantData);
      resetPlantSelection(locationName, plantName);
    } else {
      await saveConfigNoDisplay(PlantData);
      showAllNeedyPlants(locationName);
    }
  };
  
  async function fertilizePlant() {
    PlantData[locationName][plantName].lastFertilized = today.toDateString();
    
    fertilizeWarning.remove();
    
    await waterPlant();

    if (allOptions) {
      await saveConfig(PlantData);
      resetPlantSelection(locationName, plantName);
    } else {
      await saveConfigNoDisplay(PlantData);
      showAllNeedyPlants(locationName);
    }
  };
  
  async function waterPlant() {
    let plant = PlantData[locationName][plantName]

    const last = plant.hasOwnProperty('lastWatered') ? new Date(plant.lastWatered) : today;
    const daysTotal = plant.daysTotal;
    const wateringCount = plant.wateringCount;
    let differenceInDays =  Math.floor((today - last)/ (1000 * 3600 * 24))


    let isValid = new Date(last).toString() !== 'Invalid Date';

    if (differenceInDays > 0 || !plant.hasOwnProperty('lastWatered') || !isValid) {
      PlantData[locationName][plantName].daysTotal = daysTotal + differenceInDays;
      PlantData[locationName][plantName].wateringCount = wateringCount + 1;
      PlantData[locationName][plantName].lastWatered = today.toDateString();
      PlantData[locationName][plantName].currentWetness = 0;
      PlantData[locationName][plantName].lastChecked = today.toDateString();
      PlantData[locationName][plantName].average = Math.floor(PlantData[locationName][plantName].daysTotal/PlantData[locationName][plantName].wateringCount);
    }

    setNextDates();
    waterWarning.remove();
    checkWarning.remove();
    
    if (allOptions) {
      await saveConfig(PlantData);
      resetPlantSelection(locationName, plantName);
    } else {
      await saveConfigNoDisplay(PlantData);
      showAllNeedyPlants(locationName);
    }
  };
  
  async function deletePlant() {
    delete PlantData[locationName][plantName];
    if (Object.keys(PlantData[locationName]).length === 0) {
      delete PlantData[locationName];
    }
    await saveConfig(PlantData);
    setDisplayForNoPlants();
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
      fertilizerDiv.remove()
    } else {
      displayExtraInfo = true;
      expandIcon.remove()
      toggleInfoButton.append(expandedIcon);
      plantInfo.append(extraDiv)
      plantInfo.append(fertilizerDiv)
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
    let newPlantInfo = readPlantInputs("#updated");
    
    let currentlastFertilizedDate = new Date(PlantData[locationName][plantName]['lastFertilized']);
    let currentlastCheckedDate = new Date(PlantData[locationName][plantName]['lastChecked']);
    let currentlastWateredDate = new Date(PlantData[locationName][plantName]['lastWatered']);
    
    let lastFertilized = $("#updatedPlantLastFertilized").val();
    let lastChecked = $("#updatedPlantLastChecked").val();
    let lastWatered = $("#updatedPlantLastWatered").val();
    let averageDaysBetweenWatering = $("#updatedPlantAverageWateringDays").val();
    
    if (lastFertilized) {
      let lastFertilizedDate = new Date(lastFertilized);
      lastFertilizedDate = new Date( lastFertilizedDate.getTime() - lastFertilizedDate.getTimezoneOffset() * -60000 );
      let differenceInDays = Math.floor((lastFertilizedDate - currentlastFertilizedDate)/ (1000 * 3600 * 24))
      if (differenceInDays != 0) {
        PlantData[locationName][plantName]['lastFertilized'] = lastFertilizedDate.toDateString();
      }
    }

    if (lastChecked) {
      let lastCheckedDate = new Date(lastChecked);
      lastCheckedDate = new Date( lastCheckedDate.getTime() - lastCheckedDate.getTimezoneOffset() * -60000 );
      differenceInDays =  Math.floor((lastCheckedDate - currentlastCheckedDate)/ (1000 * 3600 * 24))
      if (differenceInDays != 0) {
        PlantData[locationName][plantName]['lastChecked'] = lastCheckedDate.toDateString();
      }
    }

    if (averageDaysBetweenWatering && averageDaysBetweenWatering != PlantData[locationName][plantName]['average']) {
      // resets average
      PlantData[locationName][plantName].daysTotal = parseInt(averageDaysBetweenWatering);
      PlantData[locationName][plantName].average = parseInt(averageDaysBetweenWatering);
      PlantData[locationName][plantName].wateringCount = 1;
    }

    if (lastWatered) {
      let lastWateredDate = new Date($("#updatedPlantLastWatered").val());
      lastWateredDate = new Date( lastWateredDate.getTime() - lastWateredDate.getTimezoneOffset() * -60000 );
      differenceInDays =  Math.floor((lastWateredDate - currentlastWateredDate)/ (1000 * 3600 * 24))
      if (differenceInDays != 0) {
        PlantData[locationName][plantName].lastWatered = lastWateredDate.toDateString();
        PlantData[locationName][plantName].lastChecked = lastWateredDate.toDateString();

        PlantData[locationName][plantName].daysTotal = PlantData[locationName][plantName].daysTotal + differenceInDays;
        PlantData[locationName][plantName].wateringCount = PlantData[locationName][plantName].wateringCount + 1;
        PlantData[locationName][plantName].average = Math.floor(PlantData[locationName][plantName].daysTotal/PlantData[locationName][plantName].wateringCount);
      }
    }

    PlantData[locationName][plantName] = {...PlantData[locationName][plantName], ...newPlantInfo};
    setNextDates();
    toggleUpdatePlantForm();

    await saveConfig(PlantData);
    resetPlantSelection(locationName, plantName);
  };

  async function movePlant() {
    let newLocation = $("#movedPlantLocation").val().trim();
    console.log(newLocation)
    let plant = PlantData[locationName][plantName];
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
      waterWarning.insertBefore(nextWatering);
      return true
    } else {
      waterWarning.remove()
      return false
    }
  }
  
  function needsFertilized() {
    if (doesPlantNeedFertilizer(locationName, plantName, "Full strength") || doesPlantNeedFertilizer(locationName, plantName, "Half strength")) {
      fertilizeWarning.insertBefore(lastFertilized);
      return true
    } else {
      fertilizeWarning.remove()
      return false
    }
  }
  
  function needsChecked() {
    if (doesPlantNeedChecked(locationName, plantName)) {
      checkWarning.insertBefore(nextCheck);
      return true
    } else {
      checkWarning.remove()
      return false
    }
  }
  
} // displayPlant
