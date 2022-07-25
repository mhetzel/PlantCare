//needs user.js
//needs menu.js
// needs config.js

var loginDiv = $("#login-div");
let signinDiv = $("#signin-div");
let userPic = $("#profile-pic");
let guestPic = $("#guest-pic");
let userNameText = $("#user-name");
let signOutButton = $("#signout-button");


var configDiv = $("#config-div")


function addCloseButtons() {
  let closeButtonDiv = $("<div></div>").addClass("top-right");
  let closeButton = $('<button title="Close"></button').click(closeAndShowPlants());
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
