
var PlantData = {}
var StorageKey = 'plantCareData'

function saveConfig() {
  let saveLink = $('#configText');
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PlantData));

  saveLink.attr("href", dataStr);
  console.log(JSON.stringify(PlantData))
}

function loadPlants() {
  if (typeof(Storage) !== "undefined") {
    var retrievedObject = localStorage.getItem(StorageKey);
    if (retrievedObject === null) {
      localStorage.setItem(StorageKey, JSON.stringify(PlantData));
      console.log('initializing plant data storage')
    } else {
      PlantData = JSON.parse(retrievedObject);
      console.log('loaded plant config: ', PlantData);
    }
  } else {
    alert('Sorry no way to store your plant info. Try a different browser')
  }
};

function resetPlant(dropdown) {
  dropdown.empty();
  dropdown.append('<option selected="true" disabled>Choose Plant</option>');
  dropdown.prop('selectedIndex', 0);
}

function resestPlantInfo() {
  $("#averageDaysBetweenWatering").text('n/a')
  $("#currentWetness").text('n/a')
  $("#lastChecked").text('n/a')
  $("#lastWatered").text('n/a')
  $("#water").text('n/a')
  $("#light").text('n/a')
}

function setupDropDowns() {

  let locationDropdown = $("#location-dropdown")
  let plantDropdown = $('#plant-dropdown');
  let plantData = $('#plant-data');
  let plantButtons = $('#plant-buttons');

  locationDropdown.empty();
  locationDropdown.append('<option selected="true" disabled>Choose Location</option>');
  locationDropdown.prop('selectedIndex', 0);

  plantData.hide();
  plantButtons.hide();
  resetPlant(plantDropdown);

  Object.keys(PlantData).forEach(function(location) {
    locationDropdown.append($('<option></option>').attr('value', location).text(location));
  });

  locationDropdown.change(function() {
    resetPlant(plantDropdown)
    plantData.hide()
    plantButtons.hide();
    Object.keys(PlantData[locationDropdown.val()]).forEach( plant => {
      plantDropdown.append($('<option></option>').attr('value', plant).text(plant));
    });
  });

  plantDropdown.change(function() {
    plantStatus = PlantData[locationDropdown.val()][plantDropdown.val()]
    
    if (Object.keys(plantStatus).length) {
      plantData.show()
      plantButtons.show()
      resestPlantInfo()
      $("#averageDaysBetweenWatering").text(plantStatus.averageDaysBetweenWatering)
      $("#currentWetness").text(plantStatus.currentWetness)
      $("#lastChecked").text(plantStatus.lastChecked)
      $("#lastWatered").text(plantStatus.lastWatered)
      $("#water").text(plantStatus.water)
      $("#light").text(plantStatus.light)
    }
    
  });

};

loadPlants()
setupDropDowns()

// how to add a location and plant
// implement functions