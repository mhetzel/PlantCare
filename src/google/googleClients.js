const CLIENT_ID = '439504664142-ji2fdlinh9ueqc75mjvssemdouioe5o7.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCjsiD7ycx16Zv4WaREqnB5tuD9i447XAo';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/drive';


var tokenClient;


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
}

 function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }

async function gisLoaded() {
  await google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: handleToken,
    context: "signin",
    auto_select: true
  });
  
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: tokenCallback,
  });

  
}
               
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });

  determineUserMode();
  displayLoginPage();
  google.accounts.id.prompt();
}
