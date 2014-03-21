Market.Routers.Router = Backbone.Router.extend({
  routes: {
    '':'productsIndex',
    'addProducts':'addProduct',
    "newFarmer":"newFarmer",
    "productShow/:id":"productShow",
    "farmers/:name":"farmerShow",

  },

  initialize: function(options){
   this.product_types = options.product_types
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

  newFarmer: function(){
    var nfView = new Market.Views.FarmersNew();
    this._swapView(nfView);
  },

  productsIndex: function(){
    var pIndexView = new Market.Views.ProductTypesIndex({
       collection: this.product_types
     });
     var demoShopper = new Market.Models.Shopper({id: 1})
     demoShopper.fetch();

     var favesBar = new Market.Views.ShoppersFavorites({ model: demoShopper })
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
