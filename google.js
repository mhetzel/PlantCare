const CLIENT_ID = '439504664142-ji2fdlinh9ueqc75mjvssemdouioe5o7.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCjsiD7ycx16Zv4WaREqnB5tuD9i447XAo';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/drive';

let tokenClient;
let userEmail;
let gapiInited = false;
let gisInited = false;


function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};


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
  if (gisInited) {
    document.getElementById('signout_button').style.visibility = 'hidden';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(googleUser) {
  if (googleUser) {
    let parsedData = parseJwt(googleUser.credential);
    console.log(parsedData.email);
    userEmail = parsedData.email;
  }

  console.log('signin action')

  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    document.getElementById('signout_button').style.visibility = 'visible';
    
    // todo don't call this from here
    await uploadFile();
  };


  tokenClient.requestAccessToken({prompt: 'consent'});

}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  const token = gapi.client.getToken();
  google.accounts.id.revoke(userEmail, done => {
    console.log('consent revoked');
  });
  userEmail = '';
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    document.getElementById('signout_button').style.visibility = 'hidden';
  }
};


/*
 *  Drive Functions
 */

async function readFile(fileID) {
 gapi.client.drive.files.get({
      fileId: fileID,
      alt: 'media'
    }).then(function(resp) {
      console.log(resp.body)
    }, function(reason){
      console.log('loadFileRaw ERROR: ',reason)
    });
};

async function writeFile(fileID) {
  const url = 'https://www.googleapis.com/upload/drive/v3/files/' + fileID + '?uploadType=media';
  fetch(url, {
      method: 'PATCH',
      headers: new Headers({
          Authorization: 'Bearer ' + gapi.auth.getToken().access_token,
          'Content-type': 'text/plain'
      }),
      body: JSON.stringify({ hello: 'universe' })
  })
  .then(result => result.json())
  .then(value => {
      console.log('Updated. Result:\n' + JSON.stringify(value, null, 2));
  })
  .catch(err => console.error(err))
};

async function getFileID(folderID) {
  let response;
  let id;
  try {
    response = await gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': 'files(id, name)',
      'q': "'" + folderID + "' in parents and name = 'data.json' and trashed != true"
    });
  } catch (err) {
    return null;
  }
  const files = response.result.files;
  if (!files || files.length == 0) {
    var fileContent = '';
    var file = new Blob([fileContent], {type: 'text/plain'});
    var metadata = {
        'name': 'data.json', // Filename at Google Drive
        'mimeType': 'text/plain', // mimeType at Google Drive
        'parents': [folderID], // Folder ID at Google Drive
    };

    var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
      method: 'POST',
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
      body: form,
    }).then((response) => response.json()
     ).then(function(file) {
      id = file.id;
      console.log('Created File ID: ', file.id);
    }).catch(console.error);
  } else {
    console.log('Found: ', files[0].name, ': ', files[0].id);
    id = files[0].id;
  }
  return id;
};

async function getFolderID() {
  let response;
  let id;
  try {
    response = await gapi.client.drive.files.list({
      'pageSize': 10,
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
        console.log('Created Folder ID: ', file.id);
        id = file.id;
      } else {
        console.log('Error creating the folder, '+response);
      }
    });
    return null;
  } 

  console.log('Found: ', files[0].name, ': ', files[0].id);
  return files[0].id;
};

async function uploadFile() {  
  getFolderID().then(folderID => { 
    getFileID(folderID).then(fileID => {
      console.log('save id for later: ', fileID)
      //writeFile(fileID)
      readFile(fileID)
    });
  });
};



