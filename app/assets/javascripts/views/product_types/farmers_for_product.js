Market.Views.FarmersForProductType = Backbone.View.extend({

  template: JST['product_types/farmers_for_product'],

  initialize: function () {
    this.listenTo(this.collection, 'sync add remove', this.render);
    this.collection.fetch({success: function(){$('button.add-map').trigger('click')}})
  },


  render: function(){

    var renderedContent = this.template(
      {
        ptFarmers: this.collection,
        pt: this.model
      });

    this.$el.html(renderedContent);
     $('.connected-lists').sortable( { connectWith: ".connected-lists" } );

     $('.farmer-thumbnail').on('mousedown', function(){
       $('div.favorite-farmers').addClass( 'highlight', { duration: 500 } );
     });

     $('.farmer-thumbnail').on('mouseup', function(){
       $('div.favorite-farmers').removeClass( 'highlight', { duration: 500 } )
     });

    return this;
  },

});