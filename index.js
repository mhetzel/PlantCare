
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
    $("#newPlantLastWatered").val(null);
    $("#newPlantAverageWateringDays").val(null);
    $("#config-div").hide();
    $("#changing-div").show();
    $("#plantForm").show();
    setupNewPlantDropdowns();
  }
}

function setDisplayForNoPlants() {
  if (Object.keys(PlantData).length === 0) {
    openNewPlantForm();
     $("#plant-infos").hide();
  }
}

function displayLoginPage() {
  $("#login").show();
}

function closeForm() {
  $("#changing-div").hide();
  $("#config-div").hide();
  $("#plantForm").hide();
  $("#login").hide();
  setDisplayForNoPlants();
}

async function addNewPlant() {
  let newLocation = $("#newPlantLocation").val()
  let newName = $("#newPlantName").val()
  if (newName) {
    if (!PlantData.hasOwnProperty(newLocation)) {
      PlantData[newLocation] = {}
    }
      
    if (!PlantData[newLocation].hasOwnProperty(newName)) {
      PlantData[newLocation][newName] = {}
    }
  
    PlantData[newLocation][newName]['water'] = $("#newPlantWaterNeeds").prop('selectedIndex');
    PlantData[newLocation][newName]['light'] = $("#newPlantLightNeeds").prop('selectedIndex');
    
    PlantData[newLocation][newName]['waterInstructions'] = $("#newPlantWaterInstructions").val();
    PlantData[newLocation][newName]['soil'] = $("#newPlantSoilPreferences").val();
    PlantData[newLocation][newName]['fertilzerFrequency'] = $("#newPlantFertilizer").val();
    PlantData[newLocation][newName]['fertilzerDose'] = $("#newPlantFertilizerDose").val();
    PlantData[newLocation][newName]['petSafe'] = $("#newPlantPetSafe").val();
    PlantData[newLocation][newName]['humidity'] = $("#newPlantHumitidy").val();
    
    let lastWatered = $("#newPlantLastWatered").val();
    if (lastWatered) {
      PlantData[newLocation][newName]['lastWatered'] = (new Date(lastWatered)).toDateString();
    }
    
    PlantData[newLocation][newName]['daysTotal'] = 0;
    PlantData[newLocation][newName]['wateringCount'] = 0;
    let averageDaysBetweenWatering = $("#newPlantAverageWateringDays").val();
    if (averageDaysBetweenWatering) {
      PlantData[newLocation][newName]['daysTotal'] = parseInt(averageDaysBetweenWatering);
      PlantData[newLocation][newName]['wateringCount'] = 1;
    }

    console.log(PlantData[newLocation][newName])
  
    await saveConfig(PlantData);
    closeForm();
     $("#plant-infos").show();
  }
}

dropdownSetup();
setDisplayForNoPlants();

