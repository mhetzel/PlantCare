
async function loadConfig(event) {
  console.log('uploading config')
  $("#spinner").show();
  const file = event.target.files.item(0);
  
  const text = await file.text();
  $("#spinner").hide();

  PlantData = JSON.parse(text);
  await saveConfig();
};

async function addNewPlant() {
  let newPlantData = {}
  newPlantData[$("#newPlantLocation").val()] = {}
  newPlantData[$("#newPlantLocation").val()][$("#newPlantName").val()] = {}
  newPlantData[$("#newPlantLocation").val()][$("#newPlantName").val()]['water'] = $("#newPlantWaterNeeds").val();
  newPlantData[$("#newPlantLocation").val()][$("#newPlantName").val()]['light'] = $("#newPlantLightNeeds").val();
  Object.assign(PlantData, newPlantData);
  console.log(PlantData)
  await saveConfig();
  closeForm();
  resetLocationDropdown();
  resetPlantDropdown();
  setupDropDowns();
}

async function saveConfig() {
  localStorage.setItem(StorageKey, JSON.stringify(PlantData));
}

function downloadConfig() {
  let saveLink = $('#configText');
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PlantData));

  saveLink.attr("href", dataStr);
  console.log(JSON.stringify(PlantData))
};


function openForm() {
  document.getElementById("plantForm").style.display = "block";
  document.getElementById("addButton").style.display = "none";
}

function closeForm() {
  document.getElementById("plantForm").style.display = "none";
  document.getElementById("addButton").style.display = "block";
}


$("#spinner").hide();
