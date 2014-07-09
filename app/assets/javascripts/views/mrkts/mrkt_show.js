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
		
		
	},
	
  deleter: function(event){
    dataId = $(event.target).data('productid')
    deadProduct = new Market.Models.ProductManifest( { id: dataId });
    var that = this
    deadProduct.destroy({
 	  success: function(){
	 	  that.model.products().remove(deadProduct);
	 	  $('#myModal').modal('hide');
	 	  that.model.fetch()}
    });
    $('#myModal').on('hide.bs.modal', function(){ that.render(); that.model.fetch() })
  },
	
	joinMarket: function (event) {
		event.preventDefault();
		var newAttendance = new Market.Models.MarketAttendance({mrkt_id: this.model.get('id')});
		newAttendance.save( 
			{ 
				success: function () {
					alert('Your name will now show up in the attending farmers section on this page, and this market will be listed on your page')
				}
			}
		);
	},
	
  render: function(){
    var rc = this.template({ market: this.model });
    this.$el.html(rc);
    return this;
  },
})