Market.Models.Farmer = Backbone.Model.extend({
  url: function () {
    if (this.id){ 
			return "/farmers/" + this.id
		}
    return "/farmers"
  },

  products: function () {
    if (!this._products){
      this._products = new Market.Collections.ProductManifests([], {});
    }
    return this._products;
  },

  product_types: function () {
    if (!this._product_types){
      this._product_types = new Market.Collections.ProductTypes([], {});
    }
    return this._product_types;
  },

  favorite_farmers: function () {
    if (!this._favorite_farmers){
      this._favorite_farmers = new Market.Collections.Farmers([], {});
    }
    return this._favorite_farmers;
  },
	
	markets: function () {
		if (!this._markets){
			this._markets = new Market.Collections.Mrkts([],{});
		}
		return this._markets;
	},

  parse: function(jsonResp){
    if (jsonResp.favorite_farmers) {
      this.favorite_farmers().set(jsonResp.favorite_farmers);
    }
		
		if (jsonResp.markets) {
			this.markets().set(jsonResp.markets);
		}

    if (jsonResp.product_types) {
      this.product_types().set(jsonResp.product_types);
    }

    if (jsonResp.products) {
      this.products().set(jsonResp.products);
    }

    return jsonResp;
  }

});
