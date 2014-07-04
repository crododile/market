Market.Views.MrktsIndex = Backbone.View.extend({
	template: JST['mrkts/index'],
	
	initialize: function(){
		this.collection.fetch();
		this.listenTo( this.collection, "sync", this.render );
	},
	
  initialize: function(){
    this.listenTo( this.collection, "sync", this.render );
		this.markers = [];
  },

  events: {
    // "click a.plz":"goToMarket",
    // "click button.zip-filter":"filter",
    "click button.fresh-feed":'freshFeed',
		// "mouseenter .farmer-thumbnail":"animateMarker",
		// "click .farmer-thumbnail":"panMap",
		// "submit form.zip-form":'prevent'
  },
  
  // panMap: function(event){
  // 	  event.preventDefault();
  // 	  var name = $(event.target)
  // 	  .closest(".farmer-thumbnail")
  // 	  .data('name');
  //
  // 	  var that =this;
  // 	  this.markers.forEach(function(marker){
  // 		  if (marker.title === name){
  // 			  that.map.panTo(marker.position);
  // 		  }
  // 	  });
  // },
  
  // animateMarker: function(event){
 // 	  event.preventDefault();
 // 	  var name = $(event.target)
 // 	  .closest(".farmer-thumbnail")
 // 	  .data('name');
 //
 // 	  this.markers.forEach(function(marker){
 // 		  if (marker.title === name){
 // 			  marker.setAnimation(google.maps.Animation.BOUNCE)
 // 			  setTimeout(function () {
 // 			      marker.setAnimation(null);
 // 			  }, 700);
 // 		  }
 // 	  });
 //  },
  
  prevent: function(){
	  event.preventDefault();
  },
   
  moreMarkers: function(){
     var map = this.map;
     var markers = this.collection.getMarkers();
	   var that = this;
     markers.forEach(function(marker){
       marker.setMap(map);
			 that.markers.push(marker);
       var infowindow = new google.maps.InfoWindow({
           content: "<span>"+marker.title +" "+  marker.content.attributes.name + "</span>"
       });
		 
		 // google.maps.event.addListener(marker, 'click', function(){
	 //    		  $('.right-of-map').animate({
	 //    			  scrollTop: $(".farmer-thumbnail[data-name='"+this.title+"']").offset().top -100
	 //    		  }, 2000)
	 // 		 })
 
   	  google.maps.event.addListener(marker, 'mouseover', function() {  
   	      infowindow.open(map, this);
		  $(".farmer-thumbnail[data-name='"+this.title+"']").addClass('highlight')
   	  });

   	  // assuming you also want to hide the infowindow when user mouses-out
   	  google.maps.event.addListener(marker, 'mouseout', function() {  
   	      infowindow.close();
		  $(".farmer-thumbnail[data-name='"+this.title+"']")
		  .removeClass('highlight')});
	  });
	  
   },
  
  filter: function(event){
    event.preventDefault();
    this.zip= $('input.zipfilter').val();
  },

	render: function(){
		var that = this;
		var center = new google.maps.LatLng(37.7833, -122.4167);
		var renderedContent = this.template({ mrkts: this.collection });
		this.$el.html(renderedContent);
		
		this.mapCanvas = this.$el.find('#index-map');
		this.map = new google.maps.Map(this.mapCanvas[0], {center: center, zoom: 12});
		
		map = this.map;//set global for tricky backbone bug resizing

		// function setUpHoverStuff(){
		// 	that.$el.find('div.market-button').hover(
		// 		function(){
		// 			$(this).find('span').show();
		// 		}, function() {
		// 			$(this).find('span').hide();
		// })};

		this.autocomplete = new google.maps.places.Autocomplete(
			(this.$el.find('#autocomplete')[0]),
			{ types: ['geocode'] }
		);

		google.maps.event.addListener(
			this.autocomplete, 'place_changed', function() {
			that.map.setCenter(that.autocomplete.getPlace().geometry.location)
			}
		);

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				map.setCenter(initialLocation);
			});
		}

		// setUpHoverStuff();
		return this;
	},

  // goToMarket: function(event){
 // 		if (!$(event.target).hasClass('clicked')){
 // 			var that = this;
 // 	    var ptName = $(event.target).closest('li').data("type");
 // 	    var ptModel = this.collection.findWhere( {name: ptName})
 // 	    var ptFarmers = this.ptFarmers = new Market.Collections.FarmersForProductType({
 // 	      product_type: ptModel,
 // 	      zip: this.zip
 // 	    });
 // 	    var ptMarketView = new Market.Views.FarmersForProductType({
 // 	      model: ptModel,
 // 	      collection: ptFarmers
 // 	    });
 //
 // 			$(event.target).addClass('clicked')
 // 	    ptFarmers.fetch({
 // 	      success: function(){
 // 	        ptFarmers.set( ptFarmers.byRegion( ptFarmers.zip));
 // 	        ptFarmers.trigger("sync");
 // 					that.moreMarkers();
 // 	      }
 // 	    });
 //
 // 	    $('div.show-area').append(ptMarketView.render().$el)
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
});