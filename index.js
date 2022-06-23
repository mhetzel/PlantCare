
var PlantData = {}
var StorageKey = 'plantCareData'


async function loadPlants() {
  if (typeof(Storage) !== "undefined") {
    var retrievedObject = localStorage.getItem(StorageKey);
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
  await dropdownSetup();
  setDisplayForNoPlants();
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
    $("#newPlantName").val('');
    $("#newPlantLocation").val('');
    $("#config-div").hide();
    $("#changing-div").show();
    $("#plantForm").show();
    setupWaterAndLightDropdowns();
  }
}

function setDisplayForNoPlants() {
  if (Object.keys(PlantData).length === 0) {
    openNewPlantForm();
     $("#plant-infos").hide();
  }
}

function closeForm() {
  $("#changing-div").hide();
  $("#config-div").hide();
  $("#plantForm").hide();
}

async function addNewPlant() {
  let newLocation = $("#newPlantLocation").val()
  let newName = $("#newPlantName").val()
  if (!(newLocation in Object.keys(PlantData))) {
    PlantData[newLocation] = {}
  }
  
  if (!(newName in Object.keys(PlantData[newLocation]))) {
    PlantData[newLocation][newName] = {}
  }

  PlantData[newLocation][newName]['water'] = $("#newPlantWaterNeeds").prop('selectedIndex');
  PlantData[newLocation][newName]['light'] = $("#newPlantLightNeeds").prop('selectedIndex');
  PlantData[newLocation][newName]['daysTotal'] = 0;
  PlantData[newLocation][newName]['wateringCount'] = 0;

  await saveConfig(PlantData);
  closeForm();
   $("#plant-infos").show();
}

dropdownSetup();
setDisplayForNoPlants();
