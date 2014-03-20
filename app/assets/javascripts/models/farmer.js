Market.Models.Farmer = Backbone.Model.extend({

  url: function(){
    return "/farmers/"+this.get('name')}

});
