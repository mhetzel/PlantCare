async function checkPlant() {
  let location = locationDropdown.val()
  let plantName = plantDropdown.val()
  const today = new Date();
  PlantData[location][plantName].lastChecked = today.toDateString();
  PlantData[location][plantName].currentWetness = currentWetness.prop('selectedIndex');
  await saveConfig(PlantData);
}

async function waterPlant() {
  let location = locationDropdown.val()
  let plantName = plantDropdown.val()
  
  const today = new Date();
  const last = 'lastWatered' in PlantData[location][plantName] ? new Date(PlantData[location][plantName].lastWatered) : today;
  const daysTotal = 'daysTotal' in PlantData[location][plantName] ? PlantData[location][plantName].daysTotal : 0;
  const wateringCount = 'wateringCount' in PlantData[location][plantName] ? PlantData[location][plantName].wateringCount : 0;

  PlantData[location][plantName].daysTotal = daysTotal + (today - last);
  PlantData[location][plantName].wateringCount = wateringCount + 1;
  PlantData[location][plantName].averageDaysBetweenWatering = PlantData[location][plantName].daysTotal/PlantData[location][plantName].wateringCount;
  PlantData[location][plantName].lastWatered = today.toDateString();
  PlantData[location][plantName].lastChecked = today.toDateString();
  PlantData[location][plantName].currentWetness = 0;

  await saveConfig(PlantData);
}

function updatePlant() {

}

async function deletePlant() {
  delete PlantData[locationDropdown.val()][plantDropdown.val()];
  
  if (Object.keys(PlantData[locationDropdown.val()]).length === 0) {
    delete PlantData[locationDropdown.val()]
  }
  
  await saveConfig(PlantData);
}
