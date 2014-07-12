Market.Views.MarketsForProductType = Backbone.View.extend({
  template: JST['product_types/markets_for_product'],

  initialize: function () {
    this.listenTo(this.collection, 'sync add remove', this.render);
  },

  render: function(){
    var renderedContent = this.template(
      {
        ptMarkets: this.collection,
        pt: this.model
      });

    this.$el.html(renderedContent);

    return this;
  },
});