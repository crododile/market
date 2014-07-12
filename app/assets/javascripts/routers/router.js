Market.Routers.Router = Backbone.Router.extend({
  routes: {
		'':'mrktsIndex',
    'farmersIndex':'productsIndex',
    'addProducts':'addProduct',
    "editFarmer":"editFarmer",
    "productShow/:id":"productShow",
    "home":"farmerHome",
    "farmers/:id":"farmerShow",
		"mrktsIndex":"mrktsIndex",
		"mrkts/:id":"mrktShow",
   	'about':'about'
  },

  initialize: function(options){
   this.product_types = options.product_types;
   this.current_farmer = new Market.Models.CurrentFarmer();
	 //named twice so i dont have to go change everything
	 //global becaue we use this all over
	 this.mrkts = new Market.Collections.Mrkts();
   this.current_farmer.fetch();
	 // current_farmer = this.current_farmer;
   this.listenTo(this.current_farmer.favorite_farmers(), "change", this.favoritesFeed);
	 this.listenTo(this.current_farmer, "sync", this.setCurrentFarmerGlobal);
   this.favoritesFeed();
  },
		// WORK IN PROGRESS (SYNCING ISNT REALLY HAPPENING B/C OF FILEPICKER ERROR)
	// setCurrentFarmerGlobal: function () {
	// 	alert('synced');
	// 	current_farmer = this.current_farmer;
	// },
	
	mrktShow: function(id){
		var mView = new Market.Views.MrktShow({ id: id, current_farmer: this.current_farmer });
		this._swapView(mView);
	},
	
	mrktsIndex: function(){
		var idx = new Market.Views.MrktsIndex({ collection: this.mrkts, product_types: this.product_types });
		this._swapView(idx);
		// These lines fix a bug on the maps self-applied styles
		//$('.map-canvas').removeAttr('style');
		//google.maps.event.trigger(map, "resize");
	},
  
  about: function(){
	  var about = new Market.Views.About();
	  this._swapView(about);
  },

  favoritesFeed: function(){
    var favesBar = new Market.Views.FarmersFavorites({ model: this.current_farmer });
    favesBar.render();
    $('.favorites-bar').html(favesBar.$el);
  },

  farmerHome: function(){
    var hView = new Market.Views.FarmerHome({
      model: this.current_farmer,
      collection: this.product_types
     });
    this._swapView(hView);
  },

  farmerShow: function(id){
    var fView = new Market.Views.FarmerShow({ id: id });
    this._swapView(fView);
  },

  productShow: function(id){
    var psView = new Market.Views.ProductShow({ id: id});
    this._swapView(psView);
  },

  addProduct: function(){
    var apView = new Market.Views.ProductsNew({collection: this.product_types});
    this._swapView(apView);
  },

  editFarmer: function(){
    var nfView = new Market.Views.FarmersEdit();
    this._swapView(nfView);
  },

  productsIndex: function(){
    var pIndexView = new Market.Views.ProductTypesIndex({
       collection: this.product_types
     });
    this._swapView(pIndexView);
		// These lines fix a bug on the maps self-applied styles
		$('.map-canvas').removeAttr('style');
		google.maps.event.trigger(map, "resize");
  },

  _swapView: function(view){
    this.currentView && this.currentView.remove();
    this.currentView = view;
    view.render();
    $('#content').html(view.$el);
  },

});
