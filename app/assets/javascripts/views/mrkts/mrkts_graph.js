Market.Views.MrktGraph = Backbone.View.extend({
	initialize: function (options) {
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
	
	template: JST['mrkts/mrkt_graph'],
	
	events: {

	},
	
	
  render: function () {
    var rc = this.template();
    this.$el.html(rc);
    return this;
  }
});