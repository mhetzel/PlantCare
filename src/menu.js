let plantForm = $("#add-pant-div");
let plantInfos = $("#display-plant-div");

function openConfigForm() {
  if (configDiv.css('display') == 'block') {
    closeAndShowPlants();
  } else {
    closeForm();
    configDiv.show();
  }
}

function openNewPlantForm() {
  if (plantForm.css('display') == 'block') {
    closeAndShowPlants();
  } else {
    closeForm();
    plantForm.show();
    setupNewPlantInput();
  }
}

function displayLoginPage() {
  if (loginDiv.css('display') == 'block') {
    closeAndShowPlants();
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
    plantInfos.show();
  }
}

function closeAndShowPlants() {
  closeForm();
  setDisplayForNoPlants();
}

function closeForm() {
  configDiv.hide();
  plantForm.hide();
  loginDiv.hide();
  plantInfos.hide();
}

