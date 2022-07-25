//needs user.js
//needs menu.js

var loginDiv = $("#login-div");
let signinDiv = $("signin-div");
let userPic = $("profile-pic");
let guestPic = $("guest-pic");
let userNameText = $("user-name");
let signOutButton = $("signout-button");


function setupLoginDiv() {
  let title = $(":contains(Plant Care Account Settings)");
  let closeButtonDiv = createCloseButtonDiv();
  closeButtonDiv.after(title);
}

function createCloseButtonDiv() {
  let closeButtonDiv = $("<div></div>").addClass("top-right");
  let closeButton = $('<button title="Close"></button').click(closeAndShowPlants());
  let closeIcon = $('<i></i>').addClass("fa-solid fa-xmark");
  closeButton.append(closeIcon);
  closeButtonDiv.append(closeButton);
  
  return closeButtonDiv;
}
