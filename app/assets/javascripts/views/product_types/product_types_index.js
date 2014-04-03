Market.Views.ProductTypesIndex = Backbone.View.extend({

  initialize: function(){
    this.listenTo( this.collection, "sync", this.render );
    this.zip = '37064'
  },

  template: JST['product_types/sortedindex'],

  events: {
    "click div.s-market-button":"goToMarket",
    "click button.zip-filter":"filter",
    "click button.add-map":"addMap",
    "click button.close-map":'closeMap',
    "click button.fresh-feed":'freshFeed',
	"click button.change_zip":"changeZip",
	"submit form.zip-form":'prevent'
  },
  
  prevent: function(){
	  event.preventDefault()
  },
  
  changeZip: function(){
  	
  },

  closeMap: function(){
    this.$el.find('#index-map').html("").removeAttr('style')
    $("button.close-map").toggleClass('close-map').toggleClass('add-map');
  },

  addMap: function(event){
    $(event.target).toggleClass('close-map').toggleClass('add-map');
    $(event.target).text('Close Map')
	$('.zip-form').show();

    this.mapCanvas = this.$el.find('#index-map');
	
    var markers = this.ptFarmers.getMarkers()
    var center =  markers[0].position
    this.map = new google.maps.Map(this.mapCanvas[0], {zoom: 12});

    markers.forEach(function(marker){
      marker.setMap(map);
 
      var infowindow = new google.maps.InfoWindow({
          content: "<span>"+marker.title +"</span>"
      });
 
 	  infowindow.open(map,marker);
    })
	
    if(navigator.geolocation) {
	   browserSupportFlag = true;
	   navigator.geolocation.getCurrentPosition(function(position) {
	     initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	     map.setCenter(initialLocation);
	   }, function() {
	     handleNoGeolocation(browserSupportFlag);
	   });
	 }
	 // Browser doesn't support Geolocation
	 else {
	   browserSupportFlag = false;
	   handleNoGeolocation(browserSupportFlag);
	 }

	 function handleNoGeolocation() {
	     alert("Your browser doesn't support geolocation. We've placed the map on a farmer");
	     initialLocation = center;
	   map.setCenter(initialLocation);
	 }
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
		 
		 

    setUpHoverStuff()

    return this;
  },

  goToMarket: function(event){

    $('div.directions').html('')
    if ($('button.leaveMarket').trigger('click'))

    var  ptName = $(event.target).closest('div').data("type");

    var ptModel = this.collection.findWhere( {name: ptName})
    var ptFarmers = this.ptFarmers = new Market.Collections.FarmersForProductType({
      product_type: ptModel,
      zip: this.zip
    });

    ptFarmers.fetch({
      success: function(){
        ptFarmers.set( ptFarmers.byRegion( ptFarmers.zip));
        ptFarmers.trigger("sync")
      }
    });

    var ptMarketView = new Market.Views.FarmersForProductType({
      model: ptModel,
      collection: ptFarmers
    });
    $('div.show-area').html(ptMarketView.render().$el)

  },

});
