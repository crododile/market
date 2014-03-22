Market.Views.FarmersFavorites = Backbone.View.extend({

  template: JST['farmers/favorites'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    // style for where thing will drop'sortchange':'sortChange'
    'sortupdate':'sortStuff'
  },

  sortStuff: function(event, ui){
    var fName = $(ui.item).find('.thumbnail-fname').text().trim()
    var fId = $(ui.item).find('.thumbnail-fname').data('id')
    var pType = $(ui.item).find('.thumbnail-product').text().trim()
    var fModel = new Market.Models.Farmer({name: fName});
    var nFave = new Market.Models.FavoriteFarmer({
      shopper_id: this.model.id, farmer_id: fId,
      product_favorited: pType, farmer_name: fName });
    nFave.save()
    fModel.fetch();

    this.model.favorite_farmers().add(fModel);
    this.model.favorite_farmers().save()

  },



  render: function(){
    var rc = this.template( {farmer: this.model} );
    this.$el.html(rc);
    return this
  }

});
