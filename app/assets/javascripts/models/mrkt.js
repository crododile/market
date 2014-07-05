Market.Models.Mrkt = Backbone.Model.extend({
  url: function () {
		if (this.get('marketname')){
			 return "/mrkts/" + this.get('marketname')
		}
	}
})