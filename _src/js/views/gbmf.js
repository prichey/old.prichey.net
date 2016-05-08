var waitFor = require('waitFor');
var sassqwatch = require('sassqwatch');

waitFor('body.gbmf', function() {
  var map,
    idleListener,
    requestUrl = [window.location.protocol, '', window.location.host].join('/'),
    $imageList = $('.gbmf-images'),
    $packeryGrid,
    selectedClass = 'selected',
    // selectedMarker = '/images/blue-map-pin.png',
    // regularMarker = '/images/red-map-pin.png',
    markers = [];

  var initMap = function() {
    var mapOptions = {
      zoom: 4,
      center: new google.maps.LatLng(39.50, -98.35),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      mapTypeControl: false,
      streetViewControl: false
    };

    map = new google.maps.Map($('#gbmf-map')[0], mapOptions);
    idleListener = google.maps.event.addListener(map, 'idle', firstIdle);
  };

  //add markers first time only
  var firstIdle = function() {
    google.maps.event.removeListener(idleListener);
  };

  // Adds a marker to the map and push to the array.
  var addMarker = function(location, selected) {
    // icon = !selected ? regularMarker : selectedMarker;
    zindex = !selected ? null : google.maps.Marker.MAX_ZINDEX + 1;
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      // icon: icon,
      zIndex: zindex,
    });
    marker.set('location', location);

    marker.addListener('click', function() {
      markers.forEach(function(marker) {
        // marker.setIcon(regularMarker);
        marker.setZIndex(null);
      });

      marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
      // marker.setIcon(selectedMarker);
      map.panTo(marker.getPosition());

      // $(".gbmf-image").removeClass(selectedClass);
      $selected = $(".gbmf-image-wrap[data-id='" + location.id + "']");
      $selected.click(); // probably should do this another way lol
    });

    markers.push(marker);

    if (selected) {
      map.setCenter(marker.getPosition());
    }
  };

  var getLocations = function() {
    var locations = [];
    $('.gbmf-image-wrap').each(function(i) {
      var $this = $(this);
      if ($this.data('latitude') && $this.data('longitude') && $this.data('id')) {
        locations.push({
          lat: $this.data('latitude'),
          lng: $this.data('longitude'),
          id: $this.data('id')
        });
      }
    });
    return locations;
  };

  var addMarkers = function() {
    var locations = getLocations();
    locations.forEach(function(location, i) {
      // location.lat = parseFloat(location.lat);
      // location.lng = parseFloat(location.lng);
      addMarker(location, i == 0);
    });
  };

  var initMobileResultClick = function() {
    $imageList.on('click tap touch', '.gbmf-image-wrap', function() {
      var $this = $(this),
        $results = $('.gbmf-image-wrap');

      if ($this.hasClass(selectedClass)) {
        $this.removeClass(selectedClass);
      } else {
        $results.removeClass(selectedClass);
        $this.addClass(selectedClass);
      }

      $packeryGrid.packery(); // THIS SHOULD NOT HAVE TO HAPPEN
    });
  }

  var initResultClick = function() {
    // map.setZoom(14);
    $imageList.on('click tap touch', '.gbmf-image-wrap', function() {
      map.setZoom(12);
      var $this = $(this),
        $results = $('.gbmf-image-wrap');

      if ($this.hasClass(selectedClass)) {
        $this.removeClass(selectedClass);
      } else {
        $results.removeClass(selectedClass);
        $this.addClass(selectedClass);
      }

      markers.forEach(function(marker) {
        // marker.setIcon(regularMarker);
        marker.setZIndex(null);

        // TODO: figure out where I actually want to put the data
        if (marker.location.id == $this.data('id')) {
          // marker.setIcon(selectedMarker);
          marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
          map.panTo(marker.getPosition());
        }
      });

      $packeryGrid.packery(); // THIS SHOULD NOT HAVE TO HAPPEN
    });
  };

  var initPackery = function() {
    $packeryGrid = $('.gbmf-images').imagesLoaded( function() {
      // init Masonry after all images have loaded
      // alert('images loaded');
      $packeryGrid.packery({
        // options...
        itemSelector: '.gbmf-image-wrap',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        transitionDuration: 0
      });
    });
  }

  var init = function() {
    initPackery();
    
    if ($(window).width() > 768) {
      initMap();
      initResultClick();
      addMarkers();
    } else {
      initMobileResultClick();
    }

  }

  init();
});
