
function showAllNeedyPlants() {
  let needyDiv = $("#needy-plants-div");
  needyDiv.empty()
  Object.keys(PlantData).forEach(function(locationName) {
    needyDiv.append('<h5>'+locationName+'</h5>')
    Object.keys(PlantData[locationName]).forEach(function(plantName) {
      if (doesPlantNeedWatered(locationName, plantName) || doesPlantNeedChecked(locationName, plantName)){
        needyDiv.append('<p>'+plantName+'</p>')
      }
    })
  });
}
                                 
function doesPlantNeedWatered(locationName, plantName) {
  const plant = PlantData[locationName][plantName]
  if ((plant.currentWetness >= plant.water || plant.currentWetness == 5) && plant.currentWetness != 0) {
    return true
  }
  return false
}

function doesPlantNeedChecked(locationName, plantName) {
  const plant = PlantData[locationName][plantName]
  const today = new Date();
  let lastCheckedDate = new Date(plant.lastChecked);
  let nextCheckDate = lastCheckedDate;
  let lastWateredDate = new Date(plant.lastWatered);
  let nextWateringDate = lastWateredDate;
  let average = plant.daysTotal/plant.wateringCount;
  if (!isNaN(average)) {
    average = Math.floor(average);
    nextWateringDate.setDate(nextWateringDate.getDate() + average);
    let diffDays = parseInt((nextWateringDate - nextCheckDate) / (1000 * 60 * 60 * 24), 10); 
    diffDays = diffDays > 0 ? diffDays : average;
    nextCheckDate.setDate(nextCheckDate.getDate() + Math.floor(diffDays/2))
  }
  
  if (nextCheckDate < today) {
    console.log(plantName, 'at', locationName, 'needs checked because its halfwayish between last check and next watering')
    return true;
  }
  else if (lastCheckedDate < today && nextWateringDate < today) {
    console.log(plantName, 'at', locationName, 'hasn\'t been checked today')
    console.log(plantName, 'at', locationName, 'needs checked because its past when the plant should have been watered')
    return true;
  }
  return false;
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
    PlantData[newLocation][newName]['daysTotal'] = 1;
    PlantData[newLocation][newName]['wateringCount'] = 1;
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
      let lastDate = new Date(lastWatered);
      lastDate = new Date( lastDate.getTime() - lastDate.getTimezoneOffset() * -60000 );
      PlantData[newLocation][newName]['lastWatered'] = lastDate.toDateString();
      
      let nextDate = new Date(lastDate)
      nextDate.setDate(nextDate.getDate() + PlantData[newLocation][newName]['average'])
      PlantData[newLocation][newName]['nextWatering'] = nextDate.toDateString();
    }
    console.log(PlantData[newLocation][newName]);
    
    let lastChecked = $("#newPlantLastChecked").val();
    if (lastChecked) {
      let lastDate = new Date(lastChecked);
      lastDate = new Date( lastDate.getTime() - lastDate.getTimezoneOffset() * -60000 );
      PlantData[newLocation][newName]['lastChecked'] = lastDate.toDateString();
      
      let nextDate = new Date(lastDate)
      nextDate.setDate(nextDate.getDate() + Math.floor(PlantData[newLocation][newName]['average']/2))
      PlantData[newLocation][newName]['nextCheck'] = nextDate.toDateString();
    }
    console.log(PlantData[newLocation][newName]);
    
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
