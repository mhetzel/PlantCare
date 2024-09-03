/*
 *  Account Functions
 */

var GuestMode = true;
var User = 'Guest';
var UserPicture = '';

function isFirstVisit() {
  var hasVisited = localStorage.getItem('hasVisited');
  if (!hasVisited) {
    console.log('first visit!')
    return true
  }
  return false
}


function guestButton() {
  localStorage.setItem('hasVisited', true);
  handleSignoutClick();
}

function handleReauthClick() {
  console.log('this is getting clicked');
  setCurrentUserDisplay(User, UserPicture);
}


function determineUserMode() {
  GuestMode = localStorage.getItem('guestMode') == 'true' || localStorage.getItem('userEmail') == null;
  if (!GuestMode) {
    User = localStorage.getItem('userEmail');
    UserPicture = localStorage.getItem('userPic');
  } else {
    handleSignoutClick();
  }
  toggleLoginPage();
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
  localStorage.setItem('hasVisited', true)
  if (googleUser) {
    let parsedData = parseJwt(googleUser.credential);
    UserPicture = parsedData.picture;
    User = parsedData.email;
    localStorage.setItem('userEmail', User);
    localStorage.setItem('userPic', UserPicture);
    console.log('signing in:', User);
    signedIn();
  }

};

async function tokenCallback(resp) {
    if (resp.error !== undefined) {
      throw (resp);
    }
    localStorage.setItem("token_"+User, JSON.stringify(resp));
    console.log('token callback')
    signedIn();
}

function signedIn() { 

  setCurrentUserDisplay(User, UserPicture);
  
  localStorage.setItem('guestMode', false);
  GuestMode = false;

  try {
    let token = JSON.parse(localStorage.getItem("token_"+User));
    if (token) {
      gapi.client.setToken(token)
    }
  } catch (err) {
    console.log('can\'t parse stored token')
  }

  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    console.log('trying to call load plants from sign in')
    loadPlants();
    // loadUserData();
  }

}

function signedOut() {
  setCurrentUserDisplay('Guest', null);
  
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userPic');
  localStorage.removeItem("token_"+User);
  localStorage.removeItem("data_"+User);
  localStorage.setItem('guestMode', true);
  GuestMode = true;
  User = 'Guest';
  
  console.log('trying to call load plants from signout')
  loadPlants();
  // loadUserData();
};

async function handleSignoutClick() {
  // alert('This will disable google account syncing and plant data will be stored in this browser only.')
  if (User != 'Guest') {
      google.accounts.id.disableAutoSelect();
      console.log('logging out:', User)
      await google.accounts.id.revoke(User, done => {
        console.log('consent revoked for:', User);
      });

      if (gapi.client.getToken() !== null) {
        gapi.client.setToken('');
      };
  }
  signedOut();
};
