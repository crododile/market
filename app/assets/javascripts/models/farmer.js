Market.Models.Farmer = Backbone.Model.extend({

  url: function(){
    return "/farmers/"+this.get('name')
  },

  products: function(){
    if (!this._products){
      this._products = new Market.Collections.ProductManifests([], {});
    }
    return this._products;
  },

  product_types: function(){
    if (!this._product_types){
      this._product_types = new Market.Collections.ProductTypes([], {});
    }
    return this._product_types;
  },

  parse: function(jsonResp){

    if (jsonResp.product_types){
      this.product_types().set(jsonResp.product_types);
    }

    if (jsonResp.products){
      this.products().set(jsonResp.products);
    }

    return jsonResp;
  }

});
