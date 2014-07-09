Market.Models.Mrkt = Backbone.Model.extend({
  url: function () {
		if (this.get('id')){
			 return "/mrkts/" + this.get('id')
		}
	},
	
  attendees: function(){
    if (!this._attendees){
      this._attendees = new Market.Collections.Farmers([], {});
    }
    return this._attendees;
  },

  parse: function(jsonResp){
    if (jsonResp.attendees){
      this.attendees().set(jsonResp.attendees);
    }
    return jsonResp;
  }
	
	
})