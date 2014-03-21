Market.Views.ShoppersFavorites = Backbone.View.extend({

  template: JST['shoppers/favorites'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },



  render: function(){
    var rc = this.template( {shopper: this.model} );
    this.$el.html(rc);
    return this
  }

});
