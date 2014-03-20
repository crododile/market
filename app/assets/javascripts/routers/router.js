Market.Routers.Router = Backbone.Router.extend({
  routes: {
    '':'productsIndex',
    'addProducts':'addProduct',
    "newFarmer":"newFarmer"
  },

  initialize: function(options){
   this.product_types = options.product_types
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

    this._swapView(pIndexView);
  },

  _swapView: function(view){
    this.currentView && this.currentView.remove();
    this.currentView = view;
    view.render();
     $('#content').html(view.$el);
  }


});
