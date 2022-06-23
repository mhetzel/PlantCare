
async function loadConfig(event) {
  console.log('uploading config')
  $("#spinner").show();
  const file = event.target.files.item(0);
  
  const text = await file.text();
  $("#spinner").hide();

  PlantData = JSON.parse(text);
  await saveConfig(PlantData);
  console.log('config saved')
};

function downloadConfig() {
  let saveLink = $('#configText');
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PlantData));
  saveLink.attr("href", dataStr);
};
