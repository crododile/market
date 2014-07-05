Market.Views.MrktsIndex = Backbone.View.extend({
	template: JST['mrkts/index'],
	
	initialize: function () {
		this.collection.fetch();
		this.listenTo(this.collection, "sync", this.syncstuff.bind(this));
		this.markers = [];
	},
	
	syncstuff: function () {
		this.render();
		this.moreMarkers();
	},
	
	render: function () {
		var rc = this.template({ Mrkts: this.collection });
		var center = new google.maps.LatLng(37.7833, -122.4167);
		this.$el.html(rc);
		this.mapCanvas = this.$el.find('#index-map');
		this.map = new google.maps.Map(this.mapCanvas[0], {center: center, zoom: 12});
		map = this.map;//set global for tricky backbone bug resizing
		
		this.autocomplete = new google.maps.places.Autocomplete(
			(this.$el.find('#autocomplete')[0]),
			{ types: ['geocode'] }
		);
		
		google.maps.event.addListener(
			this.autocomplete, 'place_changed', function () {
			that.map.setCenter(that.autocomplete.getPlace().geometry.location)
			}
		);
			
		// if (navigator.geolocation) {
		// 	navigator.geolocation.getCurrentPosition(function (position) {
		// 		initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		// 		map.setCenter(initialLocation);
		// 	});
		// }
		return this;
	},
	
	moreMarkers: function () {
		var map = this.map;
		var markers = this.collection.getMarkers();
		var that = this;
		markers.forEach(function (marker) {
			marker.setMap(map);
			that.markers.push(marker);
			var infowindow = new google.maps.InfoWindow({
				content: "<span>"+marker.title+"</span>"
			});

			google.maps.event.addListener(marker, 'mouseover', function () {  
				infowindow.open(map, this);
			});
			
			google.maps.event.addListener(marker, 'mouseout', function () {
				infowindow.close();
			});
		});
	}
});