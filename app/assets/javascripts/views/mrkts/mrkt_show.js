Market.Views.MrktShow = Backbone.View.extend({
	initialize: function (options) {
		this.marketname = options.marketname;
		this.model = new Market.Models.Mrkt( {marketname: this.marketname} );
		this.model.fetch();
		this.listenTo( this.model, "sync", this.render);
	},
	
	template: JST['mrkts/mrkt_show'],
	
	events: {
		"click .join-market": "joinMarket"
	},
	
	joinMarket: function (event) {
		event.preventDefault();
		var newAttendance = new Market.Models.MarketAttendance( {fmid: this.model.get('fmid') });
		debugger
		newAttendance.save({});
	},
	
  render: function(){
    var rc = this.template( { market: this.model });
    this.$el.html(rc);
    return this;
  },
})