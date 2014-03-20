Market.Collections.ShoppersByProductType = Backbone.Collection.extend({
  url: function(){
    return this.product_type.url() + "/shoppers"
  },

  model: Market.Models.Shopper,

  initialize: function(options){
    this.product_type = options.product_type
  },

});
