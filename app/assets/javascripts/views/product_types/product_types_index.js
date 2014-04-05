Market.Views.ProductTypesIndex = Backbone.View.extend({

  initialize: function(){
    this.listenTo( this.collection, "sync", this.render );
    this.zip = '37064';
	this.markers = [];
  },

  template: JST['product_types/sortedindex'],

  events: {
    "click div.s-market-button":"goToMarket",
    "click button.zip-filter":"filter",
    // "click button.add-map":"addMap",
    "click button.close-map":'closeMap',
    "click button.fresh-feed":'freshFeed',
	"submit form.zip-form":'prevent'
  },
  
  prevent: function(){
	  event.preventDefault()
  },
  
  closeMap: function(){
    // this.$el.find('#index-map').html("").removeAttr('style')
    $("button.close-map").toggleClass('close-map').toggleClass('add-map');
  },

  addMap: function(event){	 
 	$('.zip-form').show()
	
    $(event.target).toggleClass('close-map').toggleClass('add-map');

    var map = this.map
    var markers = this.ptFarmers.getMarkers()
	var that = this;
    markers.forEach(function(marker){
      marker.setMap(map);
      that.markers.push(marker)
      var infowindow = new google.maps.InfoWindow({
          content: "<span>"+marker.title +"</span>"
      });
 
	  google.maps.event.addListener(marker, 'mouseover', function() {
	      infowindow.open(map, this);
	  });

	  // assuming you also want to hide the infowindow when user mouses-out
	  google.maps.event.addListener(marker, 'mouseout', function() {
	      infowindow.close();
	  });

    })

   },
   
   moreMarkers: function(){
	   console.log(this.markers)
       var map = this.map
       var markers = this.ptFarmers.getMarkers()
	   var that = this
       markers.forEach(function(marker){
         marker.setMap(map);
		 that.markers.push(marker)
		 debugger
         var infowindow = new google.maps.InfoWindow({
             content: "<span>"+marker.title +" "+  marker.content.attributes.name + "</span>"
         });
 
   	  google.maps.event.addListener(marker, 'mouseover', function() {
   	      infowindow.open(map, this);
   	  });

   	  // assuming you also want to hide the infowindow when user mouses-out
   	  google.maps.event.addListener(marker, 'mouseout', function() {
   	      infowindow.close();
   	  });
    	 
       })
   },
  
  filter: function(event){
    event.preventDefault();
    this.zip= $('input.zipfilter').val()
  },

  render: function(){

    var renderedContent = this.template(
      {
        product_types: this.collection
      });

    this.$el.html(renderedContent);

    var that = this
    function setUpHoverStuff(){
      that.$el.find('div.market-button').hover(function(){
        $(this).find('span').show();
       }, function() {
        $(this).find('span').hide();
       }
      )
    }
	
    this.autocomplete = new google.maps.places.Autocomplete(
      (this.$el.find('#autocomplete')[0]),
      { types: ['geocode'] });
	  
      google.maps.event.addListener(this.autocomplete, 'place_changed', function() {
		  that.map.setCenter(that.autocomplete.getPlace().geometry.location)
         });	
		  
 	$('.zip-form').hide()	

	var center = new google.maps.LatLng(-28.643387, 153.612224)
    this.mapCanvas = this.$el.find('#index-map');
	
	 this.map = new google.maps.Map(this.mapCanvas[0], {center: center, zoom: 12});
	
    setUpHoverStuff()
    return this;
  },

  goToMarket: function(event){

    $('div.directions').html('')
    // if ($('button.leaveMarket').trigger('click'))
	
	if (!$(event.target).hasClass('clicked')){
		$(event.target).addClass('clicked')

	    var  ptName = $(event.target).closest('div').data("type");

	    var ptModel = this.collection.findWhere( {name: ptName})
	    var ptFarmers = this.ptFarmers = new Market.Collections.FarmersForProductType({
	      product_type: ptModel,
	      zip: this.zip
	    });
	
		var that = this

	    ptFarmers.fetch({
	      success: function(){
	        ptFarmers.set( ptFarmers.byRegion( ptFarmers.zip));
	        ptFarmers.trigger("sync")
			that.moreMarkers()
	      }
	    });

	    var ptMarketView = new Market.Views.FarmersForProductType({
	      model: ptModel,
	      collection: ptFarmers
	    });
	    $('div.show-area').html(ptMarketView.render().$el)
	} else {
		
		  var  ptName = $(event.target).closest('div').data("type");
		
		$(event.target).removeClass('clicked')
		var toRemove = []
		this.markers.forEach(function(marker, index){
			if (marker.content.attributes.name === ptName){
				toRemove.push[index]
				marker.setMap(null)
			}
		});
		var that = this
		toRemove.forEach(function(ind){
			that.markers.splice(ind, 1)
		})
	    var  ptName = $(event.target).closest('div').data("type");
		
		
		
	}
  },

});
