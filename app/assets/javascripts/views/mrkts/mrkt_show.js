Market.Views.MrktShow = Backbone.View.extend({
	initialize: function (options) {
		this.id = options.id;
		this.model = new Market.Models.Mrkt({id: this.id});
		this.current_farmer = options.current_farmer;
		this.model.fetch();
		this.listenTo(this.model, "sync", this.render);
	},
	
	template: JST['mrkts/mrkt_show'],
	
	events: {
		"click .join-market": "joinMarket",
		"click .quit-market": "quitMarket"
	},
	
	quitMarket: function (event) {
		event.preventDefault();
		var deadAttendance = new Market.Models.MarketAttendance({ id: this.id })
		deadAttendance.destroy({
			success: function () {
				alert('you are no longer listed as a merchant at this market');
			}
		});
	},
	
	joinMarket: function (event) {
		event.preventDefault();
		var newAttendance = new Market.Models.MarketAttendance({mrkt_id: this.model.get('id')});
		newAttendance.save({ 
			success: function () {
				alert('you are now listed as a merchant at this market');
			}
		});
	},
	
  render: function(){
    var rc = this.template({ market: this.model });
    this.$el.html(rc);
    return this;
  },
})