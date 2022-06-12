var PlantData = {}
var StorageKey = 'plantCareData'

async function loadConfig(event) {
  const file = event.target.files.item(0);
  const text = await file.text();
  PlantData = JSON.parse(text);
  await saveConfig();
};

async function saveConfig() {
  localStorage.setItem(StorageKey, JSON.stringify(PlantData));
}

function downloadConfig() {
  let saveLink = $('#configText');
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PlantData));

  saveLink.attr("href", dataStr);
  console.log(JSON.stringify(PlantData))
};

async function loadPlants() {
  if (typeof(Storage) !== "undefined") {
    var retrievedObject = localStorage.getItem(StorageKey);
    if (retrievedObject === null) {
      await saveConfig();
      console.log('initializing plant data storage')
    } else {
      PlantData = JSON.parse(retrievedObject);
      console.log('loaded plant config: ', PlantData);
    }
  } else {
    alert('Sorry no way to store your plant info. Try a different browser')
  }
};

loadPlants()