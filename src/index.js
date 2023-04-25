addCloseButtons();
setCurrentUserDisplay('Guest', null);
setupNewPlantInput();
setKnownPlantDropdown();
//initGoogleAPIs();


$('#normalize').selectize({
  maxItems: null,
  valueField: 'id',
  labelField: 'title',
  searchField: 'title',
  options: [
    {id: 1, title: 'Spectrometer', url: 'http://en.wikipedia.org/wiki/Spectrometers'},
    {id: 2, title: 'Star Chart', url: 'http://en.wikipedia.org/wiki/Star_chart'},
    {id: 3, title: 'Electrical Tape', url: 'http://en.wikipedia.org/wiki/Electrical_tape'}
  ],
  create: true
});

$('select[multiple]').multiselect();
