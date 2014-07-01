Market.Views.MrktsIndex = Backbone.View.extend({
	template: JST['mrkts/index'],
	
	render: function(){
		var rc= this.template();
		this.$el.html(rc)
		return this
	}
})