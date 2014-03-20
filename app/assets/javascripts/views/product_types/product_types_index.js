Market.Views.ProductTypesIndex = Backbone.View.extend({

  initialize: function(){
    this.listenTo( this.collection, "sync", this.render )
  },

  template: JST['product_types/index'],

  events: {
    "click button":"goToMarket"
  },



  render: function(){

    var renderedContent = this.template(
      {
        product_types: this.collection
      });

    this.$el.html(renderedContent);

    return this;
  },



  goToMarket: function(){
    var  ptName = $(event.target).attr("class");
    var ptModel = this.collection.findWhere( {name: ptName})
    var ptFarmers = new Market.Collections.FarmersForProductType({
      product_type: ptModel
    });

    ptFarmers.fetch();


    var ptMarketView = new Market.Views.FarmersForProductType({
      model: ptModel,
      collection: ptFarmers
    });


    $('#content').html(ptMarketView.render().$el)
  },


});
