Market.Views.FarmersForProductType = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'sync add remove', this.render);
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
  }
});