async function checkPlant() {
  plant = PlantData[locationDropdown.val()][plantDropdown.val()];
  delete PlantData[locationDropdown.val()][plantDropdown.val()];
  const today = new Date();
  plant.lastChecked = today.toDateString();
  // TODO writable wetness input
  plant.currentWetness = 3
  PlantData[locationDropdown.val()][plantDropdown.val()] = plant;

  await saveConfig();
}

async function waterPlant() {
  let location = locationDropdown.val()
  let plantName = plantDropdown.val()

  let plant = PlantData[location][plantName];
  
  const today = new Date();
  const last = 'lastWatered' in plant ? new Date(plant.lastWatered) : today;
  const daysTotal = 'daysTotal' in plant ? plant.daysTotal : 0;
  const wateringCount = 'wateringCount' in plant ? plant.wateringCount : 0;

  plant.daysTotal = daysTotal + (today - last);
  plant.wateringCount = wateringCount + 1;
  plant.averageDaysBetweenWatering = plant.daysTotal/plant.wateringCount;
  
  plant.lastWatered = today.toDateString();
  plant.lastChecked = today.toDateString();
  plant.currentWetness = 0;
  delete PlantData[location][plantName];
  PlantData[location][plantName] = plant;

  await saveConfig();
}

function updatePlant() {

}

async function deletePlant() {
  delete PlantData[locationDropdown.val()][plantDropdown.val()];
  await saveConfig();
}