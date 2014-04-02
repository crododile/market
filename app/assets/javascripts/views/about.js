Market.Views.About = Backbone.View.extend({

  template: JST['farmers/about'],


  render: function(){

    var rc = this.template();
    this.$el.html(rc);

    return this
  }

})