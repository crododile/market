Market.Views.FarmerHome = Backbone.View.extend({
  initialize: function(){
    this.listenTo( this.model, 'sync change', this.render);
  },

  template: JST['farmers/show'],

  events: {'click button.add-product':'addProduct'},

  addProduct: function(){

    var apView = new Market.Views.ProductsNew({ collection: this.collection });

    $('div.add-product').html(apView.render().$el)
  },

  render: function(){
    var rc = this.template( { farmer: this.model });
    this.$el.html(rc);
    return this;
  },

})