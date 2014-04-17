Market.Collections.FarmersForProductType = Backbone.Collection.extend({
  initialize: function(options){
    this.product_type = options.product_type
    this.zip = options.zip
  },
  // colors match button colors
  COLORS : {
	  'lamb':"#23748e",
	  'goat':'#1798c4',
	  'tomatoes':'#5e1111',
	  'beef':'#282828',
	  'greens':'#7cc817',
	  'squash':'#030702',
	  'corn':'#ffef65',
	  'eggplant':'#6715c5',
	  'pumpkin':'#a54f0d',
	  'poultry':'#a5750d',
	  'lettuce':'#7adfa4',
	  'pork':'#e05b5b'
  },

  url: function(){
    return this.product_type.url() + "/farmers"
  },

  model: Market.Models.Farmer,

  byRegion: function(zip){
    var filteredFarmers=  this.filter(function(farmer){
      return farmer.get('zipcodes') &&
             farmer.get('zipcodes').split(',').indexOf(zip) != -1;
    });
    return filteredFarmers
  },

  getMarkers: function(mapp){
	  var that = this
      var farmerMarkers = this.map(function(farmer){
      var farlatlng
      farLatLng = new google.maps.LatLng(
        parseFloat(farmer.get('lat')), parseFloat(farmer.get('lng')) );
      return new google.maps.Marker({
		  icon: {
			  path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
			  scale: 6,
			  strokeWeight: 5,
		      fillColor: that.COLORS[that.product_type.attributes.name],
		      opacity: 1,
		      strokeColor: that.COLORS[that.product_type.attributes.name]
	  },
        position: farLatLng,
        animation: google.maps.Animation.DROP,
        title: farmer.escape('name'),
		content: that.product_type
      });

    });
  return farmerMarkers
  }



});
