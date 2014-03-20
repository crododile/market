Market.Views.FarmersNew = Backbone.View.extend({

  template: JST['farmers/form'],
  tagName: 'form',

  events: {
    'click .make-farmer':'makeFarmer'
  },

  render: function(){
    var farmy = new Market.Models.Farmer();
    var rc = this.template( {farmer: farmy});
    this.$el.html(rc);
    return this;
  },

  makeFarmer: function(){
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();

    var newF = new Market.Models.Farmer( params );
    newF.save({},
      { success: function(){
          Backbone.history.navigate(
            "/farmers/" +params['farmer']['name'],
            { trigger: true})
        }
      })
  }

});
