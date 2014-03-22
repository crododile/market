Market.Routers.Router = Backbone.Router.extend({
  routes: {
    '':'productsIndex',
    'addProducts':'addProduct',
    "editFarmer":"editFarmer",
    "productShow/:id":"productShow",
    "home":"farmerHome",
    "farmers/:name":"farmerShow",
  },

  initialize: function(options){
   this.product_types = options.product_types
   this.current_farmer = new Market.Models.CurrentFarmer()
   this.current_farmer.fetch();
  },

  farmerHome: function(){
    var hView = new Market.Views.FarmerHome({ model: this.current_farmer });
    this._swapView(hView);
  },

  farmerShow: function(name){

    var fView = new Market.Views.FarmerShow({ name: name });
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

     var favesBar = new Market.Views.FarmersFavorites({ model: this.current_farmer })
     $('.favorites-bar').html(favesBar.render().$el)

    this._swapView(pIndexView);
  },

  _swapView: function(view){
    this.currentView && this.currentView.remove();
    this.currentView = view;
    view.render();
   $('#content').html(view.$el);
   $('.connected-lists').sortable( { connectWith: ".connected-lists" } );
  }


});
