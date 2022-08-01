setupNewPlantInput();
dropdown('#updated');
initGoogleAPIs();


$.getJSON('src/knownPlants.json', function(data) {
   $.each(data.knownPlants, function(i, f) {
       console.log(i)
       $("#known-plant").append($('<option></option>').attr('value', i).text(i));
   });
});



$('select[multiple]').multiselect();
