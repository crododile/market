Market.Views.ProductTypesIndex = Backbone.View.extend({

  initialize: function(){
    this.listenTo( this.collection, "sync", this.render );
  },

  template: JST['product_types/index'],

  events: {
    "click button.go-to-market":"goToMarket",
    "click button.zipfilter":"filter",
    "click button.add-map":"addMap",
    "click button.close-map":'closeMap'
  },

  closeMap: function(){
    this.$el.find('#index-map').html("").removeAttr('style')
    $(event.target).toggleClass('close-map').toggleClass('add-map');
    $(event.target).text('Open Map')
  },

  addMap: function(event){
    $(event.target).toggleClass('close-map').toggleClass('add-map');
    $(event.target).text('Close Map')

    this.mc = this.$el.find('#index-map');
    var center = new google.maps.LatLng(-33.8665433, 151.1956316);
    var map = new google.maps.Map(this.mc[0], {center: center, zoom: 15});

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

    return this;
  },

  goToMarket: function(event){
    var  ptName = $(event.target).parent().data("type");

    var ptModel = this.collection.findWhere( {name: ptName})
    var ptFarmers = new Market.Collections.FarmersForProductType({
      product_type: ptModel,
      zip: this.zip
    });

    ptFarmers.fetch({
      success: function(){
        ptFarmers.set( ptFarmers.byRegion(ptFarmers.zip));
        ptFarmers.trigger("sync")
      }
    });

    var ptMarketView = new Market.Views.FarmersForProductType({
      model: ptModel,
      collection: ptFarmers
    });
    $('div.show-area').append(ptMarketView.render().$el)
  },

});
