
var PlantData = {}

const pageAccessedByReload = (
  (window.performance.navigation && window.performance.navigation.type === 1) ||
    window.performance
      .getEntriesByType('navigation')
      .map((nav) => nav.type)
      .includes('reload')
);

if (!pageAccessedByReload) {
  initGoogleAPIs();
} else {
  dropdownSetup();
}


