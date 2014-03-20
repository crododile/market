Market.Views.FarmersForProductType = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'sync add remove', this.render);
  },

  events: {
        "click button.leaveMarket":"leaveMarket"
      },

  template: JST['product_types/farmers_for_product'],

  render: function(){
    var renderedContent = this.template(
      {
        ptFarmers: this.collection,
        pt: this.model
      });

    this.$el.html(renderedContent);

    return this;
  },

  leaveMarket: function(){
    var  ptName = $(event.target).parent().parent().attr("class");
    var $goToMarketButton = $('<button>');

    $goToMarketButton.addClass(ptName);
    $goToMarketButton.addClass("goToMarket");
    $goToMarketButton.text(ptName)
    $('li.'+ptName).html($goToMarketButton);
  }
});