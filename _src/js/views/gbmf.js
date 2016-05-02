var waitFor = require('waitFor');

waitFor('body.gbmf', function() {
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(39.50, -98.35),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    mapTypeControl:false,
    streetViewControl: false
  };

  map = new google.maps.Map($('#gbmf-map')[0], mapOptions);
});
