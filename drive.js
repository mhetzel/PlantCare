const CLIENT_ID = '439504664142-ji2fdlinh9ueqc75mjvssemdouioe5o7.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCjsiD7ycx16Zv4WaREqnB5tuD9i447XAo';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive';

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  gapi.load('client', intializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function intializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize_button').style.visibility = 'visible';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    document.getElementById('signout_button').style.visibility = 'visible';
    document.getElementById('authorize_button').innerText = 'Refresh';
    await uploadFile();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
  }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    document.getElementById('authorize_button').innerText = 'Authorize';
    document.getElementById('signout_button').style.visibility = 'hidden';
  }
}

async function getFile(name) {
  let response;
  try {
    response = await gapi.client.drive.files.list({
      'pageSize': 100,
      'fields': 'files(id, name)',
    });
  } catch (err) {
    return;
  }
  const files = response.result.files;
  if (!files || files.length == 0) {
    return;
  }

  files.forEach( function(file) {
     if (file.name == name) {
       console.log(file.id)
     }
  });
}


async function getFolderID() {
  let response;
  try {
    response = await gapi.client.drive.files.list({
      'pageSize': 100,
      'fields': 'files(id, name)',
      'q': "mimeType = 'application/vnd.google-apps.folder' and name = 'PlantCare' and trashed != true"
    });
  } catch (err) {
    return null;
  }
  const files = response.result.files;
  if (!files || files.length == 0) {
    var fileMetadata = {
      'name' : 'PlantCare',
      'mimeType' : 'application/vnd.google-apps.folder',
      'parents': ['root']
    };
    gapi.client.drive.files.create({
    resource: fileMetadata,
    }).then(function(response) {
      if (response.status == 200) {
        var file = response.result;
        console.log('Created Folder Id: ', file.id);
        return file.id
      }
      console.log('Error creating the folder, '+response);
    });
    return null;
  } 
  files.forEach( function(file) {
    console.log('Found: ', file.name, ': ', file.id)
    return file.id
  });
}

/**
* Print metadata for first 10 files.
*/
async function uploadFile() {  

  const folderID = getFolderID();
  console.log('going to create file in: ', folderID)

}
