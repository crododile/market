window.Market = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var product_types = new Market.Collections.ProductTypes()

    product_types.fetch({
      success: function(){
        var rowter = new Market.Routers.Router({ product_types: product_types });
        Backbone.history.start();
      }
    });
  }
};

$(document).ready(function(){
  Market.initialize();
});
