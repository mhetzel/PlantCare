
function showAllNeedyPlants() {
  let needyDiv = $("#needy-plants-div");
  needyDiv.empty()
  console.log('allneedybois')
  Object.keys(PlantData).forEach(function(locationName) {
    Object.keys(PlantData[locationName]).forEach(function(plantName) {
      console.log('needy boi', plantName, 'in/at', locationName)
      needyDiv.append('<p>'+plantName+' in/at '+locationName+'</p>'
    })
  });
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
