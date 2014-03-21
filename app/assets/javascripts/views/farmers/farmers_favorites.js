Market.Views.FarmersFavorites = Backbone.View.extend({

  template: JST['farmers/favorites'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },



  render: function(){
    var rc = this.template( {farmer: this.model} );
    this.$el.html(rc);
    return this
  }

});
