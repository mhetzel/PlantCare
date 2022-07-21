let loginDiv = $("#login-div");
let configDiv = $("#config-div")
let plantForm = $("#plantForm")
let changingDiv = $("#changing-div")
let plantInfos = $("#plant-infos")


function openConfigForm() {
  closeForm();
  if (configDiv.css('display') == 'block') {
    setDisplayForNoPlants();
  } else {
    changingDiv.show();
    configDiv.show();
  }
}

function openNewPlantForm() {
  closeForm();
  if (plantForm.css('display') == 'block') {
    setDisplayForNoPlants();
  } else {
    changingDiv.show();
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
  changingDiv.hide();
  configDiv.hide();
  plantForm.hide();
  loginDiv.hide();
  plantInfos.hide();
}

