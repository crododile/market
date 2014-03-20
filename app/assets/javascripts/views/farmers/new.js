Market.Views.FarmersNew = Backbone.View.extend({

  template: JST['farmers/form'],
  tagName: 'form',

  events: {
    'click button.make-farmer':'makeFarmer'
  },

  render: function(){
    var farmy = new Market.Models.Farmer();
    var rc = this.template( {farmer: farmy});
    this.$el.html(rc);
    return this;
  },

  makeFarmer: function(){
    event.preventDefault();
    debugger
    var params = $(event.currentTarget).serializeJSON();
    var newF = new Market.Models.Farmer( params );

    newF.save()

  }

});
