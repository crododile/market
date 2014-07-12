Market.Views.MrktsIndex = Backbone.View.extend({
	template: JST['mrkts/index'],
	
	initialize: function (options) {
		this.product_types = options.product_types
		this.collection.fetch();
		this.listenTo(this.collection, "sync", this.syncstuff.bind(this));
		this.markers = [];
	},
	
	events: {
		  "click a.plz":"goToMarket",
	},
	
	// goToMarket: function(event){
	// 		if (!$(event.target).hasClass('clicked')){
	// 			var that = this;
	// 	    var ptName = $(event.target).closest('li').data("type");
	// 	    var ptModel = this.product_types.findWhere( {name: ptName})
	// 	    var ptMarkets = this.ptMarkets = new Market.Collections.MarketsForProductType({
	// 	      product_type: ptModel
	// 	    });
	// 	    // var ptMarketView = new Market.Views.FarmersForProductType({
	// 	      // model: ptModel,
	// 	      // collection: ptFarmers
	// 	    // });
	//
	// 			$(event.target).addClass('clicked')
	// 	    // ptFarmers.fetch({
	// 	      // success: function(){
	// 					// that.moreMarkers();
	// 	      // }
	// 	    // });
	// 	    // $('div.show-area').append(ptMarketView.render().$el)
	// 		} else {
	// 	    var ptName = $(event.target).closest('li').data("type");
	// 			var toRemove = [];
	// 			var that = this;
	//
	// 			$(event.target).removeClass('clicked')
	// 			this.markers.forEach(function(marker, index){
	// 				if (marker.content.attributes.name === ptName){
	// 					toRemove.push[index]
	// 					marker.setMap(null)
	// 				}
	// 				$("div."+ptName+"-farmers").remove();
	// 			});
	// 			toRemove.forEach(function(ind){
	// 				that.markers.splice(ind, 1)
	// 			});
	// 		}
	// 	 },
	// },
	//
	syncstuff: function () {
		this.render();
		$('.disclaimer').html('<p>All done! This map contains farmers markets all over the country, click a marker to find its link, and click the link to visit its page.</p>');
		this.moreMarkers();
	},
	
	render: function () {
		var rc = this.template({ Mrkts: this.collection, product_types: this.product_types });
		var that = this;
		var center = new google.maps.LatLng(37.7833, -122.4167);
		this.$el.html(rc);
		this.mapCanvas = this.$el.find('#index-map');
		this.map = new google.maps.Map(this.mapCanvas[0], {center: center, zoom: 12});
		// map = this.map;//set global for tricky backbone bug resizing
		
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
							 $(".right-of-map").scrollTop() - 160)
    		  }, 1200)
					$(".market-tab[data-marketname='"+this.data+"']").addClass('highlight');
				});
		});
	}
});
