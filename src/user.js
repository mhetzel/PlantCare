/*
 *  Account Functions
 */

var GuestMode = false;
var User = 'Guest';

let userNameText = $('#user-name');
let signOutButton = $("#signout-button");
let loginDiv = $("#login-div");
let signinDiv = $("#signin-div")

function determineUserMode() {
  GuestMode = localStorage.getItem('guestMode') == 'true';
  if (!GuestMode) {
    User = localStorage.getItem('userEmail');
    if (User) {
      userNameText.text(User);
    }
    google.accounts.id.prompt((notification) => {
      if (notification.isSkippedMoment()) {
        if (notification.getSkippedReason() == 'user_cancel') {
          signedOut();
        }
      }
      if (notification.isNotDisplayed()) {
        if (notification.getNotDisplayedReason() == 'suppressed_by_user') {
          signedOut();
        }
      }
    });
  }
};

function setupSigninButton() {
  google.accounts.id.renderButton(
    document.getElementById('signin-div'),
    { theme: "filled_black", 
      size: "large", 
      type: "standard",
      shape: "pill",
      text: "signin_with",
      logo_alignment: "left"}
  )
};

function displayLoginPage() {
  if (loginDiv.css('display') == 'block') {
    hideLoginPage();
  } else {
    if (GuestMode) {
      setupSigninButton();
      signOutButton.hide();
    } else {
      signOutButton.show();
    }

    loginDiv.show();
    $("#changing-div").hide();
    $("#config-div").hide();
    $("#plant-infos").hide();
    $("#plantForm").hide();
  }
};

function hideLoginPage() {
  loginDiv.hide();
  setDisplayForNoPlants();
};

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

async function handleToken(googleUser) {
  localStorage.setItem('guestMode', false);
  let email;
  if (googleUser) {
    let parsedData = parseJwt(googleUser.credential);
    email = parsedData.email;
    localStorage.setItem('userEmail', parsedData.email);
    console.log('signing in:', parsedData.email)
    signedIn(email);
  }

  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    localStorage.setItem("token_"+email, JSON.stringify(resp));
    signedIn(email);
  };

};

function signedIn(email) {
  console.log(email, 'signed in');
  
  try {
    let token = JSON.parse(localStorage.getItem("token_"+email));
    if (token) {
      gapi.client.setToken(token)
    }
  } catch (err) {
    console.log('can\'t parse stored token')
  }


  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({prompt: 'consent'});
  } 
  
  userNameText.text(email);
  signinDiv.hide();
  signOutButton.show();
  loadPlants();
}

function signedOut() {
  let email = localStorage.getItem('userEmail');
  localStorage.removeItem('userEmail');
  localStorage.removeItem("token_"+email);
  localStorage.removeItem("data_"+email);
  signOutButton.hide();
  signinDiv.show();
  userNameText.text('Guest');
  localStorage.setItem('guestMode', true);
  GuestMode = true;
  loadPlants();
};

function handleSignoutClick() {
  alert('This will disable google account syncing and plant data will be stored in this browser only.')
  google.accounts.id.disableAutoSelect();
  let email = localStorage.getItem('userEmail');
  console.log('logging out:', email)
  google.accounts.id.revoke(email, done => {
    console.log('consent revoked for:', email);
  });
  
  if (gapi.client.getToken() !== null) {
    gapi.client.setToken('');
  };

  signedOut();
};
