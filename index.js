
var PlantData = {}
var StorageKey = 'plantCareData'

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
loadPlants();

// // how to add a location and plant
// // implement functions