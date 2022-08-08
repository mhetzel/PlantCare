
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
    
    let inputs = readPlantInputs("#new");
    PlantData[newLocation][newName] = {...PlantData[newLocation][newName], ...inputs};
  
    let lastWatered = $("#newPlantLastWatered").val();
    if (lastWatered) {
      PlantData[newLocation][newName]['lastWatered'] = (new Date(lastWatered)).toDateString();
    }
    
    let lastChecked = $("#newPlantLastChecked").val();
    if (lastChecked) {
      PlantData[newLocation][newName]['lastChecked'] = (new Date(lastChecked)).toDateString();
    }
    
    let lastFertilized = $("#newPlantLastFertilized").val();
    if (lastFertilized) {
      PlantData[newLocation][newName]['lastFertilized'] = (new Date(lastFertilized)).toDateString();
    }
    
    PlantData[newLocation][newName]['daysTotal'] = 0;
    PlantData[newLocation][newName]['wateringCount'] = 0;
    let averageDaysBetweenWatering = $("#newPlantAverageWateringDays").val();
    if (averageDaysBetweenWatering) {
      PlantData[newLocation][newName]['daysTotal'] = parseInt(averageDaysBetweenWatering);
      PlantData[newLocation][newName]['wateringCount'] = 1;
    }

    console.log(PlantData[newLocation][newName]);
  
    await saveConfig(PlantData);
    setDisplayForNoPlants();
    resetPlantSelection(newLocation, newName);
  }
}
