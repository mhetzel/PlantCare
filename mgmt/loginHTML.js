//needs user.js
//needs menu.js

var loginDiv = $("#login-div")

function setupLoginDiv() {
  let title = $("<h2></h2>").text("Plant Care Account Settings");
  
  let closeButtonDiv = $("<div></div>").addClass("top-right");
  let closeButton = $('<button title="Close"></button').click(closeAndShowPlants());
  let closeIcon = $('<i></i>').addClass("fa-solid fa-xmark");
  closeButton.append(closeIcon);
  closeButtonDiv.append(closeButton);
  
  let signinDiv = $('<div id="signin-div"></div>')
  let currentDiv = $('<div id="user-div"><img id="profile-pic" src=""><span id="guest-pic"><i class="fa-solid fa-face-grin-beam fa-2xl"></i></span><span id="current-span"><div>Currently signed in as: </div><div id="user-name">Guest</div></span></div>')
  let signoutDiv = $('<div class="g_id_signout"><button id="signout-button" onclick="handleSignoutClick()">Sign Out and Continue as Guest</button></div>')
  
  loginDiv.append(title, closeButtonDiv, signinDiv, currentDiv, signoutDiv);
}
