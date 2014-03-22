Market.Views.FarmerHome = Backbone.View.extend({
  initialize: function(){
    this.listenTo( this.model, 'sync', this.render)
  },

  template: JST['farmers/show'],

  render: function(){
    debugger
    var rc = this.template( { farmer: this.model });
    this.$el.html(rc);
    return this;
  },

})