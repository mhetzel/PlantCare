
function showAllNeedyPlants() {
  let needyDiv = $("#needy-plants-div");
  needyDiv.empty()

  let toggleInfoButton = $('<button title="Colapse/Expand Aditional Plnat Info"><i class="fa-solid fa-angle-right"></i></button>');
  toggleInfoButton.append(expand);
  toggleInfoButton.on('click', function() {
    toggleInfoButton.empty()
    toggleInfoButton.append(expanded);
  })
  Object.keys(PlantData).forEach(function(locationName) {
    const result = Object.keys(PlantData[locationName]).filter(plantName => doesPlantNeedWatered(locationName, plantName) || doesPlantNeedChecked(locationName, plantName));
    if (result.length > 0) {
      let locationDiv = $('<div id="'+locationName+'"></div>')
      needyDiv.append(locationDiv)
      let locationHeader = $('<h3></h3>')
      let locationButton = $('<button></button>')
      let expand = $('<i class="fa-solid fa-angle-right"></i>')
      let expanded = $('<i class="fa-solid fa-angle-down"></i>')
      locationButton.append(expand)
      let locationTitle = '  '+locationName
      locationHeader.append(locationButton, locationTitle)
      locationDiv.append(locationHeader)
      /*
      result.forEach(function(plantName) {
          let plantDiv = $('<div id="'+plantName+'"></div>')
          needyDiv.append(plantDiv)
          displayPlant(plantDiv, locationName, plantName, false)
      })
      */
    }
  });
}
                                 
function doesPlantNeedWatered(locationName, plantName) {
  const plant = PlantData[locationName][plantName]
  const today = new Date();
  let lastCheckedDate = new Date(plant.lastChecked);
  let nextWateringDate = new Date(plant.nextWatering);
  
  let differenceCheckDate =  Math.floor((today - lastCheckedDate)/ (1000 * 3600 * 24))

  if (differenceCheckDate > 0 && nextWateringDate <= today) {
    console.log(plantName, 'at', locationName, 'hasn\'t been checked today')
    console.log(plantName, 'at', locationName, 'probably needs watered because its past when the plant should have been watered')
    return true;
  }
  if ((plant.currentWetness >= plant.water || plant.currentWetness == 5) && plant.currentWetness != 0) {
    return true
  }
  return false
}

function doesPlantNeedChecked(locationName, plantName) {
  const plant = PlantData[locationName][plantName]
  const today = new Date();
  let lastCheckedDate = new Date(plant.lastChecked);
  let nextCheckDate = new Date(plant.nextCheck);
  let nextWateringDate = new Date(plant.nextWatering);
  
  let differenceCheckDate =  Math.floor((today - lastCheckedDate)/ (1000 * 3600 * 24))
  let differenceWaterDate =  Math.floor((today - nextWateringDate)/ (1000 * 3600 * 24))
  
  if (nextCheckDate <= today) {
    console.log(plantName, 'at', locationName, 'needs checked because its halfwayish between last check and next watering')
    return true;
  }
  else if (differenceCheckDate > 0 && nextWateringDate <= today) {
    console.log(plantName, 'at', locationName, 'hasn\'t been checked today')
    console.log(plantName, 'at', locationName, 'needs checked because its past when the plant should have been watered')
    return true;
  }
  return false;
}

function getNextWaterDate(locationName, plantName) {
  let lastWateredDate = new Date(PlantData[locationName][plantName]['lastWatered'])
  let nextWaterDate = new Date(lastWateredDate)
  nextWaterDate.setDate(nextWaterDate.getDate() + PlantData[locationName][plantName]['average'])
  PlantData[locationName][plantName]['nextWatering'] = nextWaterDate.toDateString();
  return nextWaterDate
}

function getNextCheckDate(locationName, plantName) {
  let lastCheckedDate = new Date(PlantData[locationName][plantName]['lastChecked'])
  let diffDays = 0
  if (PlantData[locationName][plantName]['nextWatering'] != 'n/a') {
    let nextWaterDate = new Date(PlantData[locationName][plantName]['nextWatering'])
    diffDays = Math.ceil(parseInt((nextWaterDate - lastCheckedDate) / (1000 * 60 * 60 * 24), 10)); 
  }
  diffDays = diffDays > 0 ? diffDays : PlantData[locationName][plantName]['average'];

  let nextCheckDate = new Date(lastCheckedDate)
  nextCheckDate.setDate(nextCheckDate.getDate() + Math.ceil(diffDays/2))
  PlantData[locationName][plantName]['nextCheck'] = nextCheckDate.toDateString();
  return nextCheckDate;
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
