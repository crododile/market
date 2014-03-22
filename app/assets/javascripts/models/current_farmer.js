Market.Models.CurrentFarmer = Backbone.Model.extend({
 url: "/current",

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

 favorite_farmers: function(){
   if (!this._favorite_farmers){
     this._favorite_farmers = new Market.Collections.FavoriteFarmers([], {});
   }
   return this._favorite_farmers;
 },


 parse: function(jsonResp){
   if (jsonResp.favorite_farmers){
     this.favorite_farmers().set(jsonResp.favorite_farmers);
   }

   if (jsonResp.product_types){
     this.product_types().set(jsonResp.product_types);
   }

   if (jsonResp.products){
     this.products().set(jsonResp.products);
   }

   return jsonResp;
 }
})