
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
  if ($("#config-div").css('display') == 'block') {
    closeForm();
  } else {
    $("#plantForm").hide();
    $("#changing-div").show();
    $("#config-div").show();
  }
}

function openNewPlantForm() {
  if ($("#plantForm").css('display') == 'block') {
    closeForm();
  } else {
    $("#config-div").hide();
    $("#changing-div").show();
    $("#plantForm").show();
    setupWaterAndLightDropdowns();
  }
}

function closeForm() {
  $("#changing-div").hide();
  $("#config-div").hide();
  $("#plantForm").hide();
}

async function addNewPlant() {
  let newPlantData = {}
  newPlantData[$("#newPlantLocation").val()] = {}
  newPlantData[$("#newPlantLocation").val()][$("#newPlantName").val()] = {}
  newPlantData[$("#newPlantLocation").val()][$("#newPlantName").val()]['water'] = $("#newPlantWaterNeeds").prop('selectedIndex');
  newPlantData[$("#newPlantLocation").val()][$("#newPlantName").val()]['light'] = $("#newPlantLightNeeds").prop('selectedIndex');
  newPlantData[$("#newPlantLocation").val()][$("#newPlantName").val()]['daysTotal'] = 0;
  newPlantData[$("#newPlantLocation").val()][$("#newPlantName").val()]['wateringCount'] = 0;
  Object.assign(PlantData, newPlantData);
  await saveConfig();
  closeForm();
}

loadPlants();
dropdownSetup(PlantData);
if (Object.keys(PlantData).length === 0) {
  openNewPlantForm();
   $("#plant-infos").hide();
}
