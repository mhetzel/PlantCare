const STORAGE_KEY = 'plantCareData'


async function loadConfig(event) {
  console.log('uploading config')
  const file = event.target.files.item(0);
  
  const text = await file.text();

  PlantData = JSON.parse(text);
  await saveConfig(PlantData);
  console.log('config saved')
};

function downloadConfig() {
  let saveLink = $('#configText');
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PlantData));
  saveLink.attr("href", dataStr);
};


async function loadPlants() {
  console.log('load plants')
  if (typeof(Storage) !== "undefined") {
    var retrievedObject = localStorage.getItem(STORAGE_KEY);
    if (retrievedObject === null) {
      await saveConfig(PlantData);
      console.log('initializing plant data storage')
    } else {
      PlantData = JSON.parse(retrievedObject);
      console.log('loaded plant config: ', PlantData);
    }
  } else {
    alert('Sorry no way to store your plant info. Try a different browser')
  }
};

async function saveConfig(plantData) {
  localStorage.setItem(StorageKey, JSON.stringify(plantData));
  await storePlantData(plantData)
  await dropdownSetup();
  setDisplayForNoPlants();
}