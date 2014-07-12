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
		var marketMarkers = this.map(function(market){
			var mrktLatLng = new google.maps.LatLng(
				parseFloat(market.get('y')), parseFloat(market.get('x')) );
				return new google.maps.Marker({
					icon: {
						path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
						scale: 6,
						strokeWeight: 5,
						opacity: 1,
					},
					position: mrktLatLng,
					animation: google.maps.Animation.DROP,
					title: market.escape('marketname'),
					data: market.escape('id'),
					content: that.product_type
				});

			});
			return marketMarkers
		}
});