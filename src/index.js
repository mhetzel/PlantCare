setupNewPlantInput();
dropdown('#updated');
initGoogleAPIs();


$.getJSON('knownPlants.json', function(data) {
   $.each(data.knownPlants, function(i, f) {
       console.log(f)
       $("#known-plant").append($('<option></option>').attr('value', f).text(f));
   });
});



$('select[multiple]').multiselect();
