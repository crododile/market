Market.Views.ProductsNew = Backbone.View.extend({

  template: JST['product_types/form'],
  tagName: 'form',

  events: {
    'click .make-product':'makeProduct'
  },

  render: function(){
    var productT = new Market.Models.ProductType();
    var rc = this.template( { productT: productT});
    this.$el.html(rc);
    return this;
  },

  makeProduct: function(){

    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var pt = this.collection.findWhere({ name: params['product_type']['name'] })
    params['product_listing']["product_type_id"] = pt.id

    var newP = new Market.Models.ProductManifest( params['product_listing'] );


    newP.save( {},
      {
        success: function(){

          Backbone.history.navigate("/productShow/"+newP.id, { trigger:true } );
        }
      }
    );
  },





})