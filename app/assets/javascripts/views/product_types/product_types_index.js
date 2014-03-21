Market.Views.ProductTypesIndex = Backbone.View.extend({

  initialize: function(){
    this.listenTo( this.collection, "sync", this.render );
  },

  template: JST['product_types/index'],

  events: {
    "click button.goToMarket":"goToMarket",
    "click button.zipfilter":"filter"
  },

  filter: function(){
    event.preventDefault();
    this.zip= $('input.zipfilter').val()
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
    var  ptName = $(event.target).parent().attr("class");
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
    $('li.'+ptName).html(ptMarketView.render().$el)
  },




});
