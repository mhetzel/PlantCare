const STORAGE_KEY = 'plantCareData'
let DriveFileID = null;

// TODO put this somewhere else
async function refreshDisplays() {
  //await dropdownSetup();
  //setDisplayForNoPlants();
  console.log('refresh Displays')
}

async function loadPlants() {
  console.log('load plants')
  if (typeof(Storage) !== "undefined") {
    retrievePlantData();
    refreshDisplays();
  } else {
    alert('Sorry no way to store your plant info. Try a different browser')
  }
};

async function saveConfig(plantData) {
  await storePlantData(plantData)
  refreshDisplays();
}


// TODO: check last updated timestamp to avoid losing data
async function storePlantData(plantData) {
  if (!GuestMode) {
    await findOrCreateConfig();
    await writeFile(DriveFileID, plantData);
  } else {
    localStorage.setItem(StorageKey, JSON.stringify(plantData));
  }
};

async function retrievePlantData() {  
  if (!GuestMode) {
    findOrCreateConfig().then(
      PlantData = await readFile(DriveFileID)
    );
    
  } else {
    var retrievedObject = localStorage.getItem(STORAGE_KEY);
    if (retrievedObject === null) {
      console.log('initializing plant data storage')
      await saveConfig({});
    } else {
      PlantData = JSON.parse(retrievedObject);
    }
  }
  console.log('loaded plant config: ', PlantData);
};

async function findOrCreateConfig() {
  if (!GuestMode) {
    if (!DriveFileID) {
      getFolderID().then(folderID => { 
        if (folderID) {
          getFileID(folderID).then(fileID => {
            DriveFileID = fileID;
          });
        } 
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
