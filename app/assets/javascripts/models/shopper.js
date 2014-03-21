Market.Models.Shopper = Backbone.Model.extend({
  urlRoot: "/shoppers",

  favorite_farmers: function(){
    if (!this._favorite_farmers){
      this._favorite_farmers = new Market.Collections.Farmers([], {});
    }
    return this._favorite_farmers;
  },

  parse: function(jsonResp){

    if (jsonResp.favorite_farmers){
      this.favorite_farmers().set(jsonResp.favorite_farmers);
    }

    return jsonResp;
  }

});
