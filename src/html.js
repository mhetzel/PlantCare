//needs user.js
//needs menu.js
// needs config.js

let loginDiv = $("#login-div");
let configDiv = $("#config-div")

let signinDiv = $("#signin-div");
let userPic = $("#profile-pic");
let guestPic = $("#guest-pic");
let userNameText = $("#user-name");
let signOutButton = $("#signout-button");

let plantForm = $("#add-pant-div");
let plantInfos = $("#display-plant-div");

let actionablePlantDiv = $("#actionable-plant-div")
let fertilizerPlantDiv = $("#fertilizer-plant-div")


function readPlantInputs(idPrefix) {
  let inputs = {};
  inputs['water'] = $(idPrefix+"PlantWaterNeeds").prop('selectedIndex');
  inputs['light'] = $(idPrefix+"PlantLightNeeds").prop('selectedIndex');
  inputs['waterInstructions'] = $(idPrefix+"PlantWaterInstructions").val();
  inputs['soil'] = $(idPrefix+"PlantSoilPreferences").val();
  inputs['fertilzerFrequency'] = $(idPrefix+"PlantFertilizer").val();
  inputs['fertilzerDose'] = $(idPrefix+"PlantFertilizerDose").val();
  inputs['petSafe'] = $(idPrefix+"PlantPetSafe").val();
  inputs['humidity'] = $(idPrefix+"PlantHumitidy").val();
  return inputs;
}


function setKnownPlantValues(prefix, plant) {
  $(prefix + "PlantWaterNeeds").prop('selectedIndex', plant['water']);
  $(prefix + "PlantWaterInstructions").val(plant['waterInstructions']);
  $('select[multiple]').multiselect('reload')
  $(prefix + "PlantSoilPreferences").val(plant['soil']);
  $(prefix + "PlantFertilizer").val(plant['fertilzerFrequency']);
  $(prefix + "PlantFertilizerDose").val(plant['fertilzerDose']);
  $(prefix + "PlantLightNeeds").prop('selectedIndex', plant['light']);
  $(prefix + "PlantPetSafe").val(plant['petSafe']);
  $(prefix + "PlantHumitidy").val(plant['humidity']);
  $(prefix + "PlantAverageWateringDays").val(plant['average']);
  
  var last = new Date(plant['lastWatered']);
  var day = ("0" + last.getDate()).slice(-2);
  var month = ("0" + (last.getMonth() + 1)).slice(-2);
  var dateFormat = last.getFullYear()+"-"+(month)+"-"+(day);
  $(prefix + "PlantLastWatered").val(dateFormat);
  
  last = new Date(plant['lastChecked']);
  day = ("0" + last.getDate()).slice(-2);
  month = ("0" + (last.getMonth() + 1)).slice(-2);
  dateFormat = last.getFullYear()+"-"+(month)+"-"+(day);
  $(prefix + "PlantLastChecked").val(dateFormat);
  
  last = new Date(plant['lastFertilized']);
  day = ("0" + last.getDate()).slice(-2);
  month = ("0" + (last.getMonth() + 1)).slice(-2);
  dateFormat = last.getFullYear()+"-"+(month)+"-"+(day);
  $(prefix + "PlantLastFertilized").val(dateFormat);
}

function waterPlants() {
  closeForm();
  if (!PlantData || Object.keys(PlantData).length === 0) {
    openNewPlantForm();
  } else {
    actionablePlantDiv.show();
    showAllNeedyPlants(null);
  }
}

function displayPlants() {
  closeForm();
  if (!PlantData || Object.keys(PlantData).length === 0) {
    openNewPlantForm();
  } else {
    closeForm();
    plantInfos.show();
  }
}

function feedPlants() {
  closeForm();
  if (!PlantData || Object.keys(PlantData).length === 0) {
    openNewPlantForm();
  } else {
    closeForm();
    fertilizerPlantDiv.show();
    showAllFertilizablePlants(null);
  }
}

function setupNewPlantInput() {
  addPlantInputFeilds('#add-plant-input', 'new')
  $("#newPlantName").val('');
  $("#newPlantLocation").val('');
  $("#newPlantLastWatered").val(null);
  $("#newPlantLastChecked").val(null);
  $("#newPlantLastFertilized").val(null);
  $("#newPlantAverageWateringDays").val(null);

  dropdown('#new');
}

function openConfigForm() {
  if (configDiv.css('display') == 'block') {
    setDisplayForNoPlants();
  } else {
    closeForm();
    configDiv.show();
  }
}

function openNewPlantForm() {
  if (plantForm.css('display') == 'block') {
    setDisplayForNoPlants();
  } else {
    closeForm();
    plantForm.show();
    setupNewPlantInput();
  }
}

function displayLoginPage() {
  if (loginDiv.css('display') == 'block') {
    setDisplayForNoPlants();
  } else {
    closeForm();
    if (GuestMode) {
      setupSigninButton();
      signOutButton.hide();
    } else {
      signOutButton.show();
    }
    
    loginDiv.show();
  }
};

function setupDisplay() {
  dropdownSetup();
  setDisplayForNoPlants();
}

function setDisplayForNoPlants() {
  closeForm();
  if (!PlantData || Object.keys(PlantData).length === 0) {
    openNewPlantForm();
  } else {
    
    actionablePlantDiv.show();
    showAllNeedyPlants(null);
  }
}

function closeForm() {
  configDiv.hide();
  plantForm.hide();
  loginDiv.hide();
  plantInfos.hide();
  fertilizerPlantDiv.hide();
  actionablePlantDiv.hide();
}

function addCloseButtons() {
  let closeButtonDiv = $("<div></div>").addClass("top-right");
  let closeButton = $('<button title="Close"></button');
  closeButton.on('click', function() {
    setDisplayForNoPlants();
  })
  let closeIcon = $('<i></i>').addClass("fa-solid fa-xmark");
  closeButton.append(closeIcon);
  closeButtonDiv.append(closeButton);
   $("h2").after(closeButtonDiv);
}

async function setCurrentUserDisplay(userName, userPicture) {
  userNameText.text(userName);
  $('#login-status-div').text('Currently signed in as: ')
  $('#reauth-div').hide();
  if (userName == 'Guest') {
    guestPic.show();
    userPic.hide();
    signinDiv.show();
    signOutButton.hide();
  } else {
   /* let valid = await isTokenValid()
    if(!valid) { */
      $('#login-status-div').text('Previously signed in as: ')
      $('#reauth-div').show();
    // } 
    userPic.attr("src", userPicture);
    userPic.show();
    guestPic.hide();
    signOutButton.show();
    signinDiv.hide();
  }
}

function addPlantInputFeilds(divId, idPrefix) {
  $(divId).empty();

  let averageWateringDays = $('<div><label for="' + idPrefix + 'PlantAverageWateringDays"><b>Average Watering Days:</b></label><input type="number" id="' + idPrefix + 'PlantAverageWateringDays"></div>')
  let lastWatered = $('<div><label for="' + idPrefix + 'PlantLastWatered"><b>Last Watered Date:</b></label><input type="date" id="' + idPrefix + 'PlantLastWatered"></div>')
  let lastChecked = $('<div><label for="' + idPrefix + 'PlantLastChecked"><b>Last Checked Date:</b></label><input type="date" id="' + idPrefix + 'PlantLastChecked"></div>')
  let lastFertilized = $('<div><label for="' + idPrefix + 'PlantLastFertilized"><b>Last Fertilized Date:</b></label><input type="date" id="' + idPrefix + 'PlantLastFertilized"></div>')
  
  let water = $('<div><label for="' + idPrefix + 'PlantWaterNeeds"><b>Water When:</b></label><select required id="' + idPrefix + 'PlantWaterNeeds"></select></div>')
  let instructions = $('<div><label for="' + idPrefix + 'PlantWaterInstructions"><b>Watering Instructions:</b></label><select name="' + idPrefix + 'PlantWaterInstructions[]" multiple id="' + idPrefix + 'PlantWaterInstructions"></select></div>')
  let soil = $('<div><label for="' + idPrefix + 'PlantSoilPreferences"><b>Soil Preferences:</b></label><select id="' + idPrefix + 'PlantSoilPreferences"></select></div>')
  let fertilizerSchedule = $('<div><label for="' + idPrefix + 'PlantFertilizer"><b>Fertilizer Frequency:</b></label><select id="' + idPrefix + 'PlantFertilizer"></select></div>')
  let fertilizerDose = $('<div><label for="' + idPrefix + 'PlantFertilizerDose"><b>Fertilizer Dose:</b></label><select id="' + idPrefix + 'PlantFertilizerDose"></select></div>')
  let light = $('<div><label for="' + idPrefix + 'PlantLightNeeds"><b>Light:</b></label><select id="' + idPrefix + 'PlantLightNeeds" required></select></div>')
  let petSafe = $('<div><label for="' + idPrefix + 'PlantPetSafe"><b>Pet Safe:</b></label><select id="' + idPrefix + 'PlantPetSafe"><option>false</option><option>true</option></select></div>')
  let humidity = $('<div><label for="' + idPrefix + 'PlantHumitidy"><b>Humidity Needs:</b></label><select id="' + idPrefix + 'PlantHumitidy"></select></div>')
  $(divId).append(averageWateringDays, lastWatered, lastChecked, lastFertilized, water, instructions, soil, fertilizerSchedule, fertilizerDose, light, petSafe, humidity)
  $('select[multiple]').multiselect();
}
