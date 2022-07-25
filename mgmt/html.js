//needs user.js
//needs menu.js
// needs config.js

var loginDiv = $("#login-div");
let signinDiv = $("signin-div");
let userPic = $("profile-pic");
let guestPic = $("guest-pic");
let userNameText = $("user-name");
let signOutButton = $("signout-button");


var configDiv = $("#config-div")

function addCloseButtons() {
  let title = $("h2");
  createCloseButtonDiv(title);
}

function createCloseButtonDiv(title) {
  let closeButtonDiv = $("<div></div>").addClass("top-right");
  let closeButton = $('<button title="Close"></button').click(closeAndShowPlants());
  let closeIcon = $('<i></i>').addClass("fa-solid fa-xmark");
  closeButton.append(closeIcon);
  closeButtonDiv.append(closeButton);
  
  closeButtonDiv.after(title);
}
