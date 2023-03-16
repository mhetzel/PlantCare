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
    let moveInput = $('<input type="text" placeholder="Enter New Plant Location" id="movedPlantLocation" required>')

    moveForm.append(buttonDiv, moveLabel, moveInput)

    $("body").append(moveDiv)
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
    let newLocation = $("#movedPlantLocation").val();
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
