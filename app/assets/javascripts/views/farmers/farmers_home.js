Market.Views.FarmerHome = Backbone.View.extend({
  initialize: function(){
    this.listenTo( this.model, 'sync', this.render);
  },

  template: JST['farmers/home'],

  events: {'click button.add-product':'addProduct'},

  addProduct: function(){
    console.log('hi')
    var apView = new Market.Views.ProductsNew({ collection: this.collection });
    apView.render()
    // apView.$el.modal()
    $('div.modal-body').html(apView.render().$el)
  },

  render: function(){
    var rc = this.template( { farmer: this.model });
    this.$el.html(rc);
    return this;
  },

})