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


function toggleMovePlantForm() {
  $("#movedPlantLocation").val('');
  if ($("#move-location-div").css('display') == 'block') {
    $("#move-location-div").hide();
  } else {
    $("#move-location-div").show();
  }
};

function toggleUpdatePlantForm() {
  resetUpdatedPlantInfo()
  if ($("#update-plant-div").css('display') == 'block') {
    $("#update-plant-div").hide();
  } else {
    $("#update-plant-div").show();
  }
};


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
    plantInfos.show();
  }
}

function closeForm() {
  configDiv.hide();
  plantForm.hide();
  loginDiv.hide();
  plantInfos.hide();
}

function addCloseButtons() {
  let closeButtonDiv = $("<div></div>").addClass("top-right");
  let closeButton = $('<button title="Close"></button').click(setDisplayForNoPlants());
  let closeIcon = $('<i></i>').addClass("fa-solid fa-xmark");
  closeButton.append(closeIcon);
  closeButtonDiv.append(closeButton);
   $("h2").after(closeButtonDiv);
}

function setCurrentUserDisplay(userName, userPicture) {
  userNameText.text(userName);
  if (userName == 'Guest') {
    guestPic.show();
    userPic.hide();
    signinDiv.show();
    signOutButton.hide();
  } else {
    userPic.attr("src", userPicture);
    userPic.show();
    guestPic.hide();
    signOutButton.show();
    signinDiv.hide();
  }
}
