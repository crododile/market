Market.Views.Map = Backbone.View.extend({

  template: JST['products/map'],

  initializer: function() {
    var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

    this.map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: pyrmont,
      zoom: 15
    });

    var request = {
      location: pyrmont,
      radius: 500,
      types: ['store']
    };
    this.infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, this.callback);
  },

  callback: function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  },

   createMarker: function(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      this.infowindow.setContent(place.name);
      this.infowindow.open(map, this);
    });
  },



  render: function(){
    var rc = this.template();
    this.$el.html = rc;
    this.initializer
    return this
  }

})