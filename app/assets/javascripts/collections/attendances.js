Market.Collections.MarketAttendances = Backbone.Collection.extend({
	url: "/market_attendances",
	Model: Market.Models.MarketAttendance
});