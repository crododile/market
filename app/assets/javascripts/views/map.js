Market.Views.map = Backbone.View.extend({

  template: JST['map'],

  render: function(){
    var rc = this.template();
    this.$el.html = rc;
    return this
  }

})