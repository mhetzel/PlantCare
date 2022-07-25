// needs menu.js
// needs config.js

var configDiv = $("#config-div")

function setupConfigDiv() {
  let title = $("<h2></h2>").text("Config File Management");
  
  let closeButtonDiv = $("<div></div>").addClass("top-right");
  let closeButton = $('<button title="Close"></button').click(closeAndShowPlants());
  let closeIcon = $('<i></i>').addClass("fa-solid fa-xmark");
  closeButton.append(closeIcon);
  closeButtonDiv.append(closeButton);
  
  let uploadButton = $('<button><label for="userConfig" title="Upload Config"><i class="fa-solid fa-upload"></i> Upload Config File</label></button>')
  let uploadInput = $('<input type="file" id="userConfig" name="userConfig" accept=".jsn, .json" onchange="uploadConfig(event)">')
  let downloadButton = $('<a id="configText" download="plantData.json" href=""><button onclick="downloadConfig()" title="Download Config"><i class="fa-solid fa-download"></i> Download Config File</button></a>')
  
  configDiv.append(title, closeButtonDiv, uploadButton, uploadInput, downloadButton);
}



      

      
