Market.Collections.MarketsForProductType = Backbone.Collection.extend({
  initialize: function(options){
    this.product_type = options.product_type
  },
  // colors match button colors

  url: function(){
    return this.product_type.url() + "/markets"
  },

  model: Market.Models.Farmer,

	getMarkers: function(){
		var that = this
		var farmerMarkers = this.map(function(farmer){
			var farLatLng = new google.maps.LatLng(
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