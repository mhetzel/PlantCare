//needs user.js
//needs menu.js

var loginDiv = $("#login-div");
let signinDiv = none;
let userPic = none;
let guestPic = none;
let userNameText = none;
let signOutButton = none;


function setupLoginDiv() {
  let title = $("<h2></h2>").text("Plant Care Account Settings");
  
  let closeButtonDiv = createCloseButtonDiv();
  
  signinDiv = $('<div id="signin-div"></div>');
  
  let currentDiv = $('<div id="user-div"></div>');
  userPic = $('<img id="profile-pic" src="">');
  guestPic = $('<span id="guest-pic"><i class="fa-solid fa-face-grin-beam fa-2xl"></i></span>');
  
  let contents = $('<span id="current-span"><div>Currently signed in as: </div></span>');
  userNameText = $('<div id="user-name">Guest</div>')
  contents.append(userNameText);
  currentDiv.append(userPic, guestPic, contents);
  
  let signOutDiv = $('<div class="g_id_signout"></div>');
  signOutButton = $('<button id="signout-button" onclick="handleSignoutClick()">Sign Out and Continue as Guest</button>');
  signOutDiv.append(signOutButton);
  
  loginDiv.append(title, closeButtonDiv, signinDiv, currentDiv, signOutDiv);
}

function createCloseButtonDiv() {
  let closeButtonDiv = $("<div></div>").addClass("top-right");
  let closeButton = $('<button title="Close"></button').click(closeAndShowPlants());
  let closeIcon = $('<i></i>').addClass("fa-solid fa-xmark");
  closeButton.append(closeIcon);
  closeButtonDiv.append(closeButton);
  
  return closeButtonDiv;
}
