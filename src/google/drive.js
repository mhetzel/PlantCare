/*
 *  Drive Functions
 */


async function checkAccess() {
  let result = await gapi.client.drive.files.list({
    'pageSize': 10,
    'spaces': 'appDataFolder',
    'fields': 'files(id, name, modifiedTime)',
    'q': "mimeType = 'application/vnd.google-apps.folder' and name = 'PlantCare' and trashed != true"
  }).then(function(response) {
    return true;
  }, function(reason) {
    if (reason.result.error.message === 'Invalid Credentials' || reason.result.error.message === 'The user does not have sufficient permissions for this file.') {
//       tokenClient.requestAccessToken();
//       google.accounts.id.prompt();
      return false;
    }
    if (reason.result.error.status === "UNAUTHENTICATED") {
      tokenClient.requestAccessToken();
      // google.accounts.id.prompt();
    }
  });
  return result;
}

async function readFile(fileID) {
  let data = null;
  if (fileID) {
    data = await gapi.client.drive.files.get({
      fileId: fileID,
      spaces: 'appDataFolder',
      alt: 'media'
    }).then(function(resp) {
      if (resp.body !== '') {
        return resp.body;
      }
      return null;
    }, function(reason){
      console.log('Read file ERROR:', reason.result.error.message)
      return null;
    });
  }
  console.log(data)
  return data;
}

 
async function writeFile(fileID, data, fileName) {
  await checkAccess(); 
  const url = 'https://www.googleapis.com/upload/drive/v3/files/' + fileID + '?uploadType=media';
  fetch(url, {
    method: 'PATCH',
    headers: new Headers({
        Authorization: 'Bearer ' + gapi.auth.getToken().access_token,
        'Content-type': 'text/plain'
    }),
    body: JSON.stringify(data)
  })
  .then(result => result.json())
  .then(value => {
    console.log('Updated. Result:\n' + JSON.stringify(value, null, 2));
  })
  .catch(err => console.error(err));
}
 
async function getFileID(fileName) {
  let response;
  let id = null;
  
  try {
    response = await gapi.client.drive.files.list({
      'pageSize': 10,
      'spaces': 'appDataFolder',
      'fields': 'files(id, name)',
      'q': "'appDataFolder' in parents and name = '" + fileName + "' and trashed != true"
    });
  } catch (err) {
    console.log(err);
    console.log('can\'t find file');
  }
  const files = response.result.files;
  if (!files || files.length == 0) {
    var fileContent = '';
    var file = new Blob([fileContent], {type: 'text/plain'});
    var metadata = {
        'name': fileName, // Filename at Google Drive
        'mimeType': 'text/plain', // mimeType at Google Drive
        'parents': ['appDataFolder'], // Folder ID at Google Drive
    }

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
    console.log('Found File', files[0].name, ':', files[0].id);
    id = files[0].id;
  }

  return id;
}
 
