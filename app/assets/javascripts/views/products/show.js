Market.Views.ProductShow = Backbone.View.extend({
  initialize:function(options){
    this.pId = options.id
    this.product = new Market.Models.ProductManifest( {id: options.id});
    this.product.fetch();
    this.listenTo(this.product, 'sync', this.render);
  },

  template: JST['products/show'],

  render: function(){
    console.log(this.product.attributes)
    var rc = this.template( { product: this.product });
    this.$el.html(rc);
    return this;
  },







})