Market.Collections.FarmersForProductType = Backbone.Collection.extend({
  initialize: function(options){
    this.product_type = options.product_type
    this.zip = options.zip
    debugger
  },

  url: function(){
    return this.product_type.url() + "/farmers"
  },

  model: Market.Models.Farmer,

  byRegion: function(zip){
    var filteredFarmers=  this.filter(function(farmer){
      return farmer.get('zipcodes') &&
             farmer.get('zipcodes').split(',').indexOf(zip) != -1;
    });
    return filteredFarmers
  }



});
