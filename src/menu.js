
function openConfigForm() {
  if ($("#config-div").css('display') == 'block') {
    closeForm();
  } else {
    $("#plantForm").hide();
    $("#plant-infos").hide();
    $("#login-div").hide();
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
    $("#login-div").hide();
    $("#plant-infos").hide();
    
    $("#changing-div").show();
    $("#plantForm").show();
    
    setupNewPlantDropdowns();
  }
}

function setDisplayForNoPlants() {
  if (!PlantData || Object.keys(PlantData).length === 0) {
    openNewPlantForm();
  } else {
    $("#plant-infos").show();
    $("#changing-div").hide();
    $("#config-div").hide();
    $("#plantForm").hide();
    $("#login-div").hide();
  }
}

function closeForm() {
  $("#changing-div").hide();
  $("#config-div").hide();
  $("#plantForm").hide();
  setDisplayForNoPlants();
}

