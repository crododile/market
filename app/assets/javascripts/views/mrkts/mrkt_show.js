Market.Views.MrktShow = Backbone.View.extend({
	initialize: function (options) {
		this.id = options.id;
		this.model = new Market.Models.Mrkt({id: this.id});
		this.current_farmer = options.current_farmer;
		this.model.fetch();
		this.listenTo(this.model, "sync", this.render);
	},
	
	PRODUCT_TYPES:
		["bakedgoods",
	    "cheese",
	    "crafts",
	    "flowers",
	    "eggs",
	    "seafood",
	    "herbs",
	    "vegetables",
	    "honey",
	    "jams",
	    "maple",
	    "meat",
	    "nursery",
	    "nuts",
	    "nursery",
	    "plants",
	    "poultry",
	    "prepared",
	    "trees",
	    "soap",
	    "wine"],
			
	PAYMENT_TYPES:
		["credit",
		 "wic",
		 "wiccash",
		 "sfmnp",
		 "snap"],
	
	template: JST['mrkts/mrkt_show'],
	
	events: {
		"click .join-market": "joinMarket",
		"click .quit-market": "quitMarket"
	},
	
	quitMarket: function (event) {
		event.preventDefault();
		var deadAttendance = new Market.Models.MarketAttendance({ id: this.id });
		var that = this;
		deadAttendance.destroy({
			success: function () {
				alert('you are no longer listed as a merchant at this market');
				that.model.fetch();
				// that.model.attendees().drop_current_farmer();
				// that.render();
			}
		});
	},
	
	joinMarket: function (event) {
		event.preventDefault();
		var that = this;
		var newAttendance = new Market.Models.MarketAttendance({mrkt_id: this.model.get('id')});
		newAttendance.save(null,
			{ success: function () {
				alert('you are now listed as a merchant at this market');
				that.model.fetch();
				},
				error: function () {
					alert('something is afoot');
				}
			});
	},
	
  render: function () {
    var rc = this.template({ market: this.model, paymentTypes: this.PAYMENT_TYPES, productTypes: this.PRODUCT_TYPES });
    this.$el.html(rc);
    return this;
  }
});