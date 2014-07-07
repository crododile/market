Market.Views.MrktsIndex = Backbone.View.extend({
	template: JST['mrkts/index'],
	
	initialize: function () {
		this.markers = [];
		if (this.collection.length === 0) {this.collection.fetch();}
		this.listenTo(this.collection, "sync", this.syncstuff.bind(this));
	},
	
	syncstuff: function () {
		this.render();
		$('.disclaimer').html("<p>All done! This map contains farmers markets all over the country,	click a marker to find its link, and click the link to visit its page.</p>");
		this.moreMarkers();
	},
	
	render: function () {
		var rc = this.template({ Mrkts: this.collection });
		var that = this;
		var center = new google.maps.LatLng(37.7833, -122.4167);
		this.$el.html(rc);
		this.mapCanvas = this.$el.find('#index-map');
		this.map = new google.maps.Map(this.mapCanvas[0], {center: center, zoom: 12});
		mapToo = this.map;//set global for tricky backbone bug resizing
		
		this.autocomplete = new google.maps.places.Autocomplete(
			(this.$el.find('#autocomplete')[0]),
			{ types: ['geocode'] }
		);
		
		google.maps.event.addListener(
			this.autocomplete, 'place_changed', function () {
			that.map.setCenter(that.autocomplete.getPlace().geometry.location)
			}
		);
			
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				that.map.setCenter(initialLocation);
			});
		}
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
			
 		 google.maps.event.addListener(marker, 'click', function(){
    		  $('.right-of-map').animate({
    			  scrollTop: 
							($(".market-tab[data-marketname='"+this.data+"']").offset().top + 
							 $(".right-of-map").scrollTop() - 100)
    		  }, 1200)
					$(".market-tab[data-marketname='"+this.data+"']").addClass('highlight');
				});
		});
	}
});