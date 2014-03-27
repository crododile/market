Market.Views.ProductTypesIndex = Backbone.View.extend({

  initialize: function(){
    this.listenTo( this.collection, "sync", this.render );
    this.zip = '94103'
  },

  template: JST['product_types/sortedindex'],

  events: {
    "click div.s-market-button":"goToMarket",
    // "click div.market-button":"goToMarket",
    // "mouseover div.market-button":"addText",
//     "mouseout div.market-button":"removeText",
    "click button.zipfilter":"filter",
    "click button.add-map":"addMap",
    "click button.close-map":'closeMap',
    "click button.fresh-feed":'freshFeed'
  },

  // removeText: function(event){
 //    var pType = $(event.target.children[0]).toggleClass('hidden').toggleClass('visible')
 //  },
 //
 //  addText: function(event){
 //    var pType = $(event.target.children[0]).toggleClass('hidden').toggleClass('visible')
 //  },


  closeMap: function(){
    this.$el.find('#index-map').html("").removeAttr('style')
    $(event.target).toggleClass('close-map').toggleClass('add-map');
    $(event.target).text('Open Map')
  },

  addMap: function(event){
    $(event.target).toggleClass('close-map').toggleClass('add-map');
    $(event.target).text('Close Map')

    this.mc = this.$el.find('#index-map');

    var markers = this.ptFarmers.getMarkers()
    var center =  markers[0].position
    var map = new google.maps.Map(this.mc[0], {center: center, zoom: 12});

    markers.forEach(function(marker){
      marker.setMap(map);

      var infowindow = new google.maps.InfoWindow({
          content: "<span>"+marker.title +"</span>"
      });

      // google.maps.event.addListener(marker, 'click', function() {
     //    infowindow.open(map,marker);
     //  });

    infowindow.open(map,marker);
    })
  },

  filter: function(event){
    event.preventDefault();
    this.zip= $('input.zipfilter').val()
    // addMap(this.zip)
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
        $(this).find('p').show();
       }, function() {
        $(this).find('p').hide();
       }
      )
    }

    setUpHoverStuff()

    return this;
  },

  goToMarket: function(event){

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
    // var tarClass = "."+ptName+'-farmers'
    // console.log(tarClass)
    //
    // $('body').scrollspy({ target: tarClass })

  },

});
