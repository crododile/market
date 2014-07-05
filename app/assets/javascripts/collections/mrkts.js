Market.Collections.Mrkts = Backbone.Collection.extend({
  url:"/mrkts",
	
  model: Market.Models.Mrkt,
	
	getMarkers: function(){
		var that = this
		var mrktMarkers = this.map(function(mrkt){
			var mrktLatLng = new google.maps.LatLng( mrkt.get('y'), mrkt.get('x'));
			return new google.maps.Marker({
					position: mrktLatLng,
					title: mrkt.escape('marketname'),
					data: mrkt.escape('fmid')
				});
			});
			return mrktMarkers
		},

});
