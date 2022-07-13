const CLIENT_ID = '439504664142-ji2fdlinh9ueqc75mjvssemdouioe5o7.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCjsiD7ycx16Zv4WaREqnB5tuD9i447XAo';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/drive';

var tokenClient;
var gapiInited = false;
var gisInited = false;

async function initGoogleAPIs() {
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: handleToken,
    context: "signin",
    auto_select: true
  });
  
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
}
