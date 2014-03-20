Market.Routers.Router = Backbone.Router.extend({
  routes: {
    '':'productsIndex',

  },

  initialize: function(options){
   this.product_types = options.product_types
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
