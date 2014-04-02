Market.Views.ProductsNew = Backbone.View.extend({

  template: JST['product_types/form'],
  tagName: 'form',

  events: {
    'click .make-product':'makeProduct'
  },

  render: function(){
    var productT = new Market.Models.ProductType();

    var rc = this.template( { pTs: this.collection, productT: productT });
    this.$el.html(rc);
    return this;
  },

  makeProduct: function(){

    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var pt = this.collection.findWhere({ name: params['product_type']['name'] })
    params['product_listing']["product_type_id"] = pt.id

    var newP = new Market.Models.ProductManifest( params['product_listing'] );

    var that = this
    newP.save( {},
      {
        success: function(){
          that.model.products().add(newP);
		  that.collection.add(newP)
		  $('#myModal').modal('hide');
        }
      }
    );
  },





})