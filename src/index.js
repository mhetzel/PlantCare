addCloseButtons();
setCurrentUserDisplay('Guest', null);
setupNewPlantInput();
setKnownPlantDropdown();
//initGoogleAPIs();


var eventHandler = function(name) {
  return function() {
    console.log(name, arguments);
  };
};
var $select = $('#select-state').selectize({
  create          : true,
  onChange        : eventHandler('onChange'),
  onItemAdd       : eventHandler('onItemAdd'),
  onItemRemove    : eventHandler('onItemRemove'),
  onOptionAdd     : eventHandler('onOptionAdd'),
  onOptionRemove  : eventHandler('onOptionRemove'),
  onDropdownOpen  : eventHandler('onDropdownOpen'),
  onDropdownClose : eventHandler('onDropdownClose'),
  onFocus         : eventHandler('onFocus'),
  onBlur          : eventHandler('onBlur'),
  onInitialize    : eventHandler('onInitialize'),
});



$('select[multiple]').multiselect();
