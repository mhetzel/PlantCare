/*
 *  Account Functions
 */

var GuestMode = false;
var User = 'Guest';
var UserPicture = '';


function determineUserMode() {
  GuestMode = localStorage.getItem('guestMode') == 'true';
  if (!GuestMode) {
    User = localStorage.getItem('userEmail');
    UserPicture = localStorage.getItem('userPic');

    setCurrentUserDisplay(User, UserPicture);
    
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
  } else {
    signedOut();
  }
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
  
  if (googleUser) {
    let parsedData = parseJwt(googleUser.credential);
    UserPicture = parsedData.picture;
    User = parsedData.email;
    localStorage.setItem('userEmail', User);
    localStorage.setItem('userPic', UserPicture);
    console.log('signing in:', User);
    signedIn();
  }

  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    localStorage.setItem("token_"+User, JSON.stringify(resp));
    signedIn();
  };

};

function signedIn() { 
  refreshCreds()
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
  } 

  console.log('trying to call load plants from signin')
  loadPlants();
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
};

function handleSignoutClick() {
  // alert('This will disable google account syncing and plant data will be stored in this browser only.')
  google.accounts.id.disableAutoSelect();
  console.log('logging out:', User)
  google.accounts.id.revoke(User, done => {
    console.log('consent revoked for:', User);
  });
  
  if (gapi.client.getToken() !== null) {
    gapi.client.setToken('');
  };

  signedOut();
};
