
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

async function saveConfig() {
  localStorage.setItem(StorageKey, JSON.stringify(PlantData));
  dropdownSetup(PlantData);
}

function openConfigForm() {
  document.getElementById("config-div").style.display = "block";
  document.getElementById("plantForm").style.display = "none";
  document.getElementById("changing-div").style.display = "block";
}

function openNewPlantForm() {
  document.getElementById("plantForm").style.display = "block";
  document.getElementById("config-div").style.display = "none";
  document.getElementById("changing-div").style.display = "block";
}

function closeForm() {
  document.getElementById("changing-div").style.display = "none";
}

async function addNewPlant() {
  let newPlantData = {}
  newPlantData[$("#newPlantLocation").val()] = {}
  newPlantData[$("#newPlantLocation").val()][$("#newPlantName").val()] = {}
  newPlantData[$("#newPlantLocation").val()][$("#newPlantName").val()]['water'] = $("#newPlantWaterNeeds").val();
  newPlantData[$("#newPlantLocation").val()][$("#newPlantName").val()]['light'] = $("#newPlantLightNeeds").val();
  newPlantData[$("#newPlantLocation").val()][$("#newPlantName").val()]['daysTotal'] = 0;
  newPlantData[$("#newPlantLocation").val()][$("#newPlantName").val()]['wateringCount'] = 0;
  Object.assign(PlantData, newPlantData);
  await saveConfig();
  closeForm();
}


loadPlants();
dropdownSetup(PlantData);

// implement plant functions
// use drop downs for water/light levels
// display all plants in need of checking or watering
// close config and add plant when button is reclicked
// automatically show plant if there is only one in the selected location