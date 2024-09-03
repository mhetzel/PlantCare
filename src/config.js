const STORAGE_KEY = 'plantCareData';
const USER_STORAGE = 'plantUserData';
let DriveFileID = null;
let UserFileID = null;
var PlantData = {};
var UserData = {};
var Timestamp = null;

async function loadUserData() {
  console.log('load user data');
  if (typeof(Storage) !== "undefined") {
    await retrieveUserData();
    console.log('loaded user config: ', UserData, UserFileID);
    setKnownPlantDropdown();
  } else {
    alert('Sorry no way to store your settings. Try a different browser');
  }
}


async function loadPlants() {
  console.log('load plants');
  if (typeof(Storage) !== "undefined") {
    await retrievePlantData();
    console.log('loaded plant config: ', PlantData, DriveFileID);
    setupDisplay();
    setDisplayForNoPlants();
  } else {
    alert('Sorry no way to store your plant info. Try a different browser');
  }
}

async function retrieveUserData() {
  let retrievedObject = null;

  if (!GuestMode) {
    console.log('from retrieveUserData')
    await findOrCreateUserConfig();
    console.log('read file from retrieveUserData')
    retrievedObject = await readFile(UserFileID);
  } else {
    retrievedObject = localStorage.getItem(USER_STORAGE);
  }
  
  if (retrievedObject) {
    let fileData = JSON.parse(retrievedObject);
    UserData = fileData;
  }
  console.log('initializing user storage');
  saveUserConfig(UserData);
}

async function saveUserConfig(userData) {
  console.log(userData)
  await saveUserConfigNoDisplay(userData)
  setKnownPlantDropdown();
}

async function saveUserConfigNoDisplay(userData) {
  let fileData = userData
  if (!GuestMode && UserFileID) {
    await writeFile(UserFileID, fileData);
  } else {
    localStorage.setItem(USER_STORAGE, JSON.stringify(fileData));
  }
}

async function saveConfig(plantData) {
  await saveConfigNoDisplay(plantData)
  setupDisplay();
}

async function saveConfigNoDisplay(plantData) {
  let fileData = {'timestamp': Date.now(), 'plants': plantData}
  // todo compare timestamp before writing to storage?
  if (!GuestMode && DriveFileID) {
    await writeFile(DriveFileID, fileData);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fileData));
  }
}

async function retrievePlantData() {  
  let retrievedObject = null;

  if (!GuestMode) {
    console.log('from retrievePlantData')
    await findOrCreateConfig();
    console.log('read file from retrievePlantData')
    retrievedObject = await readFile(DriveFileID);
  } else {
    retrievedObject = localStorage.getItem(STORAGE_KEY);
  }
  
  if (retrievedObject) {
    let fileData = JSON.parse(retrievedObject);
    if (fileData.hasOwnProperty('timestamp')) {
      Timestamp = fileData['timestamp'];
    }
    if (fileData.hasOwnProperty('plants')) {
      PlantData = fileData['plants'];
    } else {
      PlantData = fileData;
    }
  }
  console.log('initializing plant data storage');
  saveConfig(PlantData);
}

async function findOrCreateUserConfig() {
  if (!GuestMode) {
    if (!UserFileID) {
      UserFileID = await getFolderID().then(folderID => { 
        console.log('getFileID from findOrCreateUserConfig')
        return getFileID(folderID, 'user.json');
      });
    }
  } else {
    console.log('No drive access as Guest');
  }
}

async function findOrCreateConfig() {
  if (!GuestMode) {
    if (!DriveFileID) {
      DriveFileID = await getFolderID().then(folderID => { 
        console.log('getFileID from findOrCreateConfig')
        return getFileID(folderID, 'data.json');
      });
    }
  } else {
    console.log('No drive access as Guest');
  }
}

/*
 * Local File Functions
 */
async function uploadConfig(event) {
  console.log('uploading config');
  const file = event.target.files.item(0);
  
  const text = await file.text();

  fileData = JSON.parse(text);
  PlantData = fileData['plants']
  await saveConfig(PlantData);
  console.log('config saved');
}

function downloadConfig() {
  let saveLink = $('#configText');
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PlantData));
  saveLink.attr("href", dataStr);
}
