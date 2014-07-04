Market.Collections.Mrkts = Backbone.Collection.extend({
  url:"/mrkts",
	
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

  model: Market.Models.Mrkt
});
