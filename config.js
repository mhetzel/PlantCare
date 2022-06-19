
async function loadConfig(event) {
  console.log('uploading config')
  $("#spinner").show();
  const file = event.target.files.item(0);
  
  const text = await file.text();
  $("#spinner").hide();

  PlantData = JSON.parse(text);
  await saveConfig();
};

function updateConfig() {

}

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

$("#spinner").hide();
loadPlants()