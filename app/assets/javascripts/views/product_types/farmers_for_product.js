Market.Views.FarmersForProductType = Backbone.View.extend({

  template: JST['product_types/farmers_for_product'],

  initialize: function () {
    this.listenTo(this.collection, 'sync add remove', this.render);
  },

  events: {
        "click button.leaveMarket":"leaveMarket"
      },


  render: function(){

    var renderedContent = this.template(
      {
        ptFarmers: this.collection,
        pt: this.model
      });

    this.$el.html(renderedContent);
     $('.connected-lists').sortable( { connectWith: ".connected-lists" } );

    return this;
  },

  leaveMarket: function(){
    // var  ptName = $(event.target).parent().parent().data("type");
    // var $goToMarketButton = $('<button>');
    //
    // $goToMarketButton.addClass("btn btn-block btn-"+ptName);
    // $goToMarketButton.addClass("go-to-market");
    // $goToMarketButton.text(ptName)
    // $('div.'+ptName).html($goToMarketButton);
    $('div.show-area').html('')
    this.remove()
  }
});