Market.Routers.Router = Backbone.Router.extend({
  routes: {
    '':'productsIndex',
    'addProduct':'addProduct'

  },

  initialize: function(options){
   this.product_types = options.product_types
  },

  addProduct: function(){

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
