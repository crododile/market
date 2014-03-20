Market.Collections.FarmersForProductType = Backbone.Collection.extend({
  initialize: function(options){
    this.product_type = options.product_type
  },

  url: function(){
    return this.product_type.url() + "/farmers"
  },

  model: Market.Models.Farmer,



});
