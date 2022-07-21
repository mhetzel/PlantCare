const STORAGE_KEY = 'plantCareData'
let DriveFileID = null;
var PlantData = {}
var Timestamp = null

async function loadPlants() {
  console.log('load plants')
  if (typeof(Storage) !== "undefined") {
    await retrievePlantData();
    console.log('loaded plant config: ', PlantData);
    setupDisplay();
  } else {
    alert('Sorry no way to store your plant info. Try a different browser')
  }
};

// TODO: check last updated timestamp to avoid losing data
async function saveConfig(plantData) {
  // todo compare timestamp before writing to storage
  if (!GuestMode) {
    await findOrCreateConfig();
    await writeFile(DriveFileID, plantData);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plantData));
  }
  setupDisplay();
};

async function retrievePlantData() {  
  let retrievedObject = null;

  if (!GuestMode) {
    await findOrCreateConfig();
    retrievedObject = await readFile(DriveFileID);
  } else {
    retrievedObject = localStorage.getItem(STORAGE_KEY);
  }
  
  if (retrievedObject === null) {
    // todo 'now'
    console.log('initializing plant data storage')
      await saveConfig({});
  } else {
    // todo compare timestamp before setting PlantData
    PlantData = JSON.parse(retrievedObject);
  }
};

async function findOrCreateConfig() {
  if (!GuestMode) {
    if (!DriveFileID) {
      DriveFileID = await getFolderID().then(folderID => { 
        return getFileID(folderID);
      });
    }
  } else {
    console.log('No drive access as Guest')
  }
};

/*
 * Local File Functions
 */
async function uploadConfig(event) {
  console.log('uploading config')
  const file = event.target.files.item(0);
  
  const text = await file.text();

  PlantData = JSON.parse(text);
  await saveConfig(PlantData);
  console.log('config saved')
};

function downloadConfig() {
  let saveLink = $('#configText');
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PlantData));
  saveLink.attr("href", dataStr);
};
