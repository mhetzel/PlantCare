
function doesPlantNeedChecked(locationName, plantName) {
  const plant = PlantData[locationName][plantName]
  const today = new Date();
  let lastCheckedDate = new Date(plant.lastChecked);
  let nextCheckDate = new Date(plant.nextCheck);
  let nextWateringDate = new Date(plant.nextWatering);
  
  let differenceCheckDate =  Math.floor((today - lastCheckedDate)/ (1000 * 3600 * 24))
  let differenceWaterDate =  Math.floor((today - nextWateringDate)/ (1000 * 3600 * 24))
  
  if (plant.currentWetness == 0 && differenceCheckDate == 1) {
    return false
  }
  
  if (nextCheckDate <= today) {
    //console.log(plantName, 'at', locationName, 'needs checked because its halfwayish between last check and next watering')
    return true;
  }
  else if (differenceCheckDate > 1 && nextWateringDate <= today) {
    //console.log(plantName, 'at', locationName, 'hasn\'t been checked today')
    //console.log(plantName, 'at', locationName, 'needs checked because its past when the plant should have been watered')
    return true;
  }
  return false;
}

// set to min (14) and (daysTilNextWatering/2)
// if it is two days til watering day move check day forward
// if it was checked yesterday move check day forward
function getNextCheckDate(locationName, plantName) {
  let lastCheckedDate = new Date(PlantData[locationName][plantName]['lastChecked'])
  
  const today = new Date();  
  let nextCheckDate = new Date(lastCheckedDate)

  let daysBetweenLastCheckAndNextWatering = 0
  if (PlantData[locationName][plantName]['nextWatering'] != 'n/a') {
    let nextWaterDate = new Date(PlantData[locationName][plantName]['nextWatering'])
    daysBetweenLastCheckAndNextWatering = Math.ceil(parseInt((nextWaterDate - lastCheckedDate) / (1000 * 60 * 60 * 24), 10)); 
  }
  daysBetweenLastCheckAndNextWatering = daysBetweenLastCheckAndNextWatering > 0 ? daysBetweenLastCheckAndNextWatering : PlantData[locationName][plantName]['average'];
  
  // only set to halfway between next watering if it's less that 2 weeks out
  if (daysBetweenLastCheckAndNextWatering/2 < 14) {
    // if its only two days then go with it
    if (daysBetweenLastCheckAndNextWatering == 2) {
      nextCheckDate.setDate(nextCheckDate.getDate() + daysBetweenLastCheckAndNextWatering)
    } else {
      nextCheckDate.setDate(nextCheckDate.getDate() + Math.ceil(daysBetweenLastCheckAndNextWatering/2))
      let differenceCheckDate =  Math.floor((nextCheckDate - lastCheckedDate)/ (1000 * 3600 * 24))
      // if it was checked yesterday move it up a day
      if (differenceCheckDate == 1) {
        nextCheckDate.setDate(nextCheckDate.getDate() + 1)
      }
    }
  } else {
    nextCheckDate.setDate(nextCheckDate.getDate() + 14)
  }
  
  PlantData[locationName][plantName]['nextCheck'] = nextCheckDate.toDateString();
  return nextCheckDate;
}



function getNextWaterDate(locationName, plantName) {
  let lastWateredDate = new Date(PlantData[locationName][plantName]['lastWatered'])
  let nextWaterDate = new Date(lastWateredDate)
  nextWaterDate.setDate(nextWaterDate.getDate() + PlantData[locationName][plantName]['average'])
  PlantData[locationName][plantName]['nextWatering'] = nextWaterDate.toDateString();
  return nextWaterDate
}
                                 
function doesPlantNeedWatered(locationName, plantName) {
  const plant = PlantData[locationName][plantName]
  const today = new Date();
  let lastCheckedDate = new Date(plant.lastChecked);
  let nextWateringDate = new Date(plant.nextWatering);
  
  let differenceCheckDate =  Math.floor((today - lastCheckedDate)/ (1000 * 3600 * 24))

  if (differenceCheckDate > 0 && nextWateringDate <= today) {
    //console.log(plantName, 'at', locationName, 'hasn\'t been checked today')
    //console.log(plantName, 'at', locationName, 'probably needs watered because its past when the plant should have been watered')
    return true;
  }
  if ((plant.currentWetness >= plant.water || plant.currentWetness == 5) && plant.currentWetness != 0) {
    return true
  }
  if (differenceCheckDate >= 14) {
    //console.log(plantName, 'at', locationName, 'hasn\'t been checked for over two weeks')
    return true
  }
  return false
}





function comparePlantNeeds(locationName, planta, plantb) {
  let plantaNeedsWatered = doesPlantNeedWatered(locationName, planta)
  let plantbNeedsWatered = doesPlantNeedWatered(locationName, plantb)
  
  if (plantaNeedsWatered && !plantbNeedsWatered) {
    // a is less than b by some ordering criterion
    return -1;
  }
  
  if (!plantaNeedsWatered && plantbNeedsWatered) {
    // a is greater than b by the ordering criterion
    return 1;
  }
  
  if (plantaNeedsWatered && plantbNeedsWatered) {
    let plantaNextWateringDate = new Date(PlantData[locationName][planta].nextWatering);
    let plantbNextWateringDate = new Date(PlantData[locationName][plantb].nextWatering);
    
    if (plantaNextWateringDate < plantbNextWateringDate) {
      // a is less than b by some ordering criterion
      return -1
    }
    
    if (plantaNextWateringDate > plantbNextWateringDate) {
      // a is greater than b by the ordering criterion
      return 1;
    }
    
    // a must be equal to b
    return 0;
  }
  
  if (!plantaNeedsWatered && !plantbNeedsWatered) {
    let plantaNastCheckedDate = new Date(PlantData[locationName][planta].nextCheck);
    let plantbNastCheckedDate = new Date(PlantData[locationName][plantb].nextCheck);
    
    if (plantaNastCheckedDate < plantbNastCheckedDate) {
      // a is less than b by some ordering criterion
      return -1
    }
    
    if (plantaNastCheckedDate > plantbNastCheckedDate) {
      // a is greater than b by the ordering criterion
      return 1;
    }
    // a must be equal to b
    return 0;
  }
}

$('#needsWater').change(function() {
	showAllNeedyPlants(null)
});

$('#needsChecked').change(function() {
	showAllNeedyPlants(null)
});

function getNeedyPlants(locationName) {
  let needyPlants = []
  if ($('#needsWater')[0].checked && $('#needsChecked')[0].checked) {
    needyPlants = Object.keys(PlantData[locationName]).filter(plantName => doesPlantNeedWatered(locationName, plantName) || doesPlantNeedChecked(locationName, plantName));
  } else if ($('#needsWater')[0].checked && !$('#needsChecked')[0].checked) {
    needyPlants = Object.keys(PlantData[locationName]).filter(plantName => doesPlantNeedWatered(locationName, plantName));
  } else if (!$('#needsWater')[0].checked && $('#needsChecked')[0].checked) {
    needyPlants = Object.keys(PlantData[locationName]).filter(plantName => doesPlantNeedChecked(locationName, plantName));
  }
  if (needyPlants.length > 0) {
  	needyPlants.sort(function compareFn(a, b) { return comparePlantNeeds(locationName, a, b) })
  }
  return needyPlants
}


function showAllPlantsForLocation(parentDiv, locationName) {
  parentDiv.empty()

  Object.keys(PlantData[locationName]).forEach(function(plantName) {
    let plantDiv = $('<div id="'+plantName+locationName+'"></div>')
    
    displayPlant(plantDiv, locationName, plantName, true)
    parentDiv.append(plantDiv)
  })
  parentDiv.show()
}



function showAllNeedyPlants(locationToShow) {
  let needyDiv = $("#needy-plants-div");
  needyDiv.empty()

  Object.keys(PlantData).forEach(function(locationName) {
    const result = getNeedyPlants(locationName);
    if (result.length > 0) {
      let locationDiv = $('<div id="'+locationName+'"></div>')
      needyDiv.append(locationDiv)
      let locationHeader = $('<h3></h3>')
      let locationButton = $('<button></button>')
      let expand = $('<i class="fa-solid fa-angle-right"></i>')
      let expanded = $('<i class="fa-solid fa-angle-down"></i>')
      locationButton.append(expanded)
      let locationTitle = '  '+locationName
      locationHeader.append(locationButton, locationTitle)
      locationDiv.append(locationHeader)
      let plantsAtLocationDiv = $('<div></div>')
      locationDiv.append(plantsAtLocationDiv)
      
      if (locationName != locationToShow) {
        plantsAtLocationDiv.hide();
        expanded.remove()
        locationButton.append(expand)
      }
      
      result.forEach(function(plantName) {
          let plantDiv = $('<div id="'+plantName+locationName+'"></div>')
          plantsAtLocationDiv.append(plantDiv)
          displayPlant(plantDiv, locationName, plantName, false)
      })
      locationButton.on('click', function() {
        if (plantsAtLocationDiv.css('display') == 'block') {
          plantsAtLocationDiv.hide();
          expanded.remove()
          locationButton.append(expand)
        } else {
          plantsAtLocationDiv.show();
          expand.remove()
          locationButton.append(expanded)
        }
      })
    }
  });
}

/*
plantKeys = [
'lastWatered',
'lastChecked',
'lastFertilized',
'daysTotal',
'wateringCount',
'average',
'nextWatering',
'nextCheck',
'nextFertilizing',
'water',
'light',
'waterInstructions',
'soil',
'fertilzerFrequency',
'fertilzerDose',
'petSafe',
'humidity',
]
*/

async function addNewPlant() {
  let newLocation = $("#newPlantLocation").val();
  let newName = $("#newPlantName").val();
  if (newName) {
    if (!PlantData.hasOwnProperty(newLocation)) {
      PlantData[newLocation] = {};
    }
      
    if (!PlantData[newLocation].hasOwnProperty(newName)) {
      PlantData[newLocation][newName] = {};
    }
    
    // defaults
    PlantData[newLocation][newName]['lastWatered'] = 'n/a'
    PlantData[newLocation][newName]['lastChecked'] = 'n/a'
    PlantData[newLocation][newName]['lastFertilized'] = 'n/a'
    PlantData[newLocation][newName]['nextWatering'] = 'n/a'
    PlantData[newLocation][newName]['nextCheck'] = 'n/a'
    PlantData[newLocation][newName]['nextFertilizing'] = 'n/a'
    PlantData[newLocation][newName]['daysTotal'] = 0;
    PlantData[newLocation][newName]['wateringCount'] = 0;
    PlantData[newLocation][newName]['average'] = 1;
        
    let inputs = readPlantInputs("#new");
    PlantData[newLocation][newName] = {...PlantData[newLocation][newName], ...inputs};
    
    let averageDaysBetweenWatering = $("#newPlantAverageWateringDays").val();
    if (averageDaysBetweenWatering) {
      PlantData[newLocation][newName]['daysTotal'] = parseInt(averageDaysBetweenWatering);
      PlantData[newLocation][newName]['average'] = parseInt(averageDaysBetweenWatering);
      PlantData[newLocation][newName]['wateringCount'] = 1;
    }
    
    let lastWatered = $("#newPlantLastWatered").val();
    if (lastWatered) {
      let lastWateredDate = new Date(lastWatered);
      lastWateredDate = new Date( lastWateredDate.getTime() - lastWateredDate.getTimezoneOffset() * -60000 );
      PlantData[newLocation][newName]['lastWatered'] = lastWateredDate.toDateString();
      getNextWaterDate(newLocation, newName);
    }
    
    let lastChecked = $("#newPlantLastChecked").val();
    if (lastChecked) {
      let lastCheckedDate = new Date(lastChecked);
      lastCheckedDate = new Date( lastCheckedDate.getTime() - lastCheckedDate.getTimezoneOffset() * -60000 );
      PlantData[newLocation][newName]['lastChecked'] = lastCheckedDate.toDateString();
      getNextCheckDate(newLocation, newName);
    }

    let lastFertilized = $("#newPlantLastFertilized").val();
    if (lastFertilized) {
      PlantData[newLocation][newName]['lastFertilized'] = (new Date(lastFertilized)).toDateString();
    }
        
    console.log(PlantData[newLocation][newName]);
  
    await saveConfig(PlantData);
    setDisplayForNoPlants();
    resetPlantSelection(newLocation, newName);
  }
}
