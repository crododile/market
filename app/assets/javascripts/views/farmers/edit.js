Market.Views.FarmersEdit = Backbone.View.extend({
  template: JST['farmers/form'],
  tagName: 'form',

  initialize: function(){
    this.farmer = new Market.Models.CurrentFarmer();
    this.farmer.fetch();
    this.listenTo(this.farmer, 'sync', this.render);
  },

  events: {
    'click .make-farmer':'makeFarmer'
  },

  makeFarmer: function(){
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    this.farmer.save( params , { patch: true } );
  },


  render: function(){
    var rc = this.template( { farmer: this.farmer });
    this.$el.html(rc);
    return this;
  },

})