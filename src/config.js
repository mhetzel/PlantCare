const STORAGE_KEY = 'plantCareData';
let DriveFileID = null;
var PlantData = {};
var Timestamp = null;

async function loadPlants() {
  console.log('load plants');
  if (typeof(Storage) !== "undefined") {
    await retrievePlantData();
    console.log('loaded plant config: ', PlantData);
    setupDisplay();
  } else {
    alert('Sorry no way to store your plant info. Try a different browser');
  }
}

async function saveConfig(plantData) {
  let fileData = {'timestamp': Date.now(), 'plants': plantData}
  // todo compare timestamp before writing to storage?
  if (!GuestMode) {
    await findOrCreateConfig();
    await writeFile(DriveFileID, fileData);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fileData));
  }
  setupDisplay();
}

async function retrievePlantData() {  
  let retrievedObject = null;

  if (!GuestMode) {
    await findOrCreateConfig();
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

async function findOrCreateConfig() {
  if (!GuestMode) {
    if (!DriveFileID) {
      DriveFileID = await getFolderID().then(folderID => { 
        return getFileID(folderID);
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

  PlantData = JSON.parse(text);
  await saveConfig(PlantData);
  console.log('config saved');
}

function downloadConfig() {
  let saveLink = $('#configText');
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PlantData));
  saveLink.attr("href", dataStr);
}
