let loginDiv = $("#login-div");
let configDiv = $("#config-div");
let plantForm = $("#add-pant-div");
let plantInfos = $("#display-plant-div");

function openConfigForm() {
  closeForm();
  if (configDiv.css('display') == 'block') {
    setDisplayForNoPlants();
  } else {
    configDiv.show();
  }
}

function openNewPlantForm() {
  closeForm();
  if (plantForm.css('display') == 'block') {
    setDisplayForNoPlants();
  } else {
    plantForm.show();
    setupNewPlantInput();
  }
}

function displayLoginPage() {
  closeForm();
  if (loginDiv.css('display') == 'block') {
    setDisplayForNoPlants();
  } else {
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
    plantInfos.show();
  }
}

function closeForm() {
  configDiv.hide();
  plantForm.hide();
  loginDiv.hide();
  plantInfos.hide();
}

