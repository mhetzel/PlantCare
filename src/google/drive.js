/*
 *  Drive Functions
 */

async function refreshCreds() {
  let result = await gapi.client.drive.files.list({
    'pageSize': 10,
    'fields': 'files(id, name)',
    'q': "mimeType = 'application/vnd.google-apps.folder' and name = 'PlantCare' and trashed != true"
  }).then(function(response) {
    return true;
  }, function(reason) {
    if (reason.result.error.message === 'Invalid Credentials' || reason.result.error.message === 'The user does not have sufficient permissions for this file.') {
      return false;
    }
  });
  return result;
}

async function readFile(fileID) {
  let data = null;
  if (fileID) {
    data = await gapi.client.drive.files.get({
      fileId: fileID,
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
  return data;
}
 
async function writeFile(fileID, data) {
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
 
async function getFileID(folderID) {
  let response;
  let id = null;
  
  if (folderID) {
    try {
      response = await gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': 'files(id, name)',
        'q': "'" + folderID + "' in parents and name = 'data.json' and trashed != true"
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
          'name': 'data.json', // Filename at Google Drive
          'mimeType': 'text/plain', // mimeType at Google Drive
          'parents': [folderID], // Folder ID at Google Drive
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
  }
  return id;
}
 
async function getFolderID() {
  let id = await gapi.client.drive.files.list({
    'pageSize': 10,
    'fields': 'files(id, name)',
    'q': "mimeType = 'application/vnd.google-apps.folder' and name = 'PlantCare' and trashed != true"
  }).then(function(response) {
    const files = response.result.files;
    let folderId = null;
    if (!files || files.length == 0) {
      var fileMetadata = {
        'name' : 'PlantCare',
        'mimeType' : 'application/vnd.google-apps.folder',
        'parents': ['root']
      }
      gapi.client.drive.files.create({
        resource: fileMetadata,
      }).then(function(response) {
        if (response.status == 200) {
          var file = response.result;
          console.log('Created Folder ID: ', file.id);
          folderId = file.id;
        } else {
          console.log('Error creating the folder, '+response);
        }
      });
    } else {
      console.log('Found Folder', files[0].name, ':', files[0].id);
      folderId = files[0].id;
    }
    return folderId;
  }, function(reason) {
    console.log('Find/create folder ERROR:', reason.result.error.message);
    if (reason.result.error.message === 'Invalid Credentials' || reason.result.error.message === 'The user does not have sufficient permissions for this file.') {
      tokenClient.requestAccessToken();
      return null;
    }
  });
  return id;
}
