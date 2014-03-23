Market.Views.ProductShow = Backbone.View.extend({
  initialize:function(options){
    this.pId = options.id
    this.product = new Market.Models.ProductManifest( {id: options.id});
    this.product.fetch();
    this.listenTo(this.product, 'sync', this.render);
    this.$el2 = $('<div>')
  },

  template: JST['products/show'],
  template2: JST['products/modalBody'],

  render: function(){

    var rc = this.template( { product: this.product });
    var rc2 = this.template2( { product: this.product })
    this.$el.html(rc);
    this.$el2.html(rc2);
    return this;
  },

})