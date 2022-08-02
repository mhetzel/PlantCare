setupNewPlantInput();
dropdown('#updated');
initGoogleAPIs();


$.getJSON('src/knownPlants.json', function(data) {
   $.each(data, function(i, f) {
       $("#known-plant").append($('<option></option>').attr('value', i).text(i));
   });
});



$('select[multiple]').multiselect();
