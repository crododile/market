Market.Views.FarmerShow = Backbone.View.extend({
  initialize: function(options){
    this.name = options.name

    this.farmer = new Market.Models.Farmer( { name: options.name });

    this.farmer.fetch();
    this.listenTo(this.farmer, 'sync', this.render);
  },

  events: {
    "click button.show-product":"showProduct"
  },

  showProduct: function(){
    var id = $(event.target).data('id')
    var psView = new Market.Views.ProductShow({ id: id});

    $('div.modal-body').html(psView.render().$el)
  },

  template: JST['farmers/show'],

  render: function(){
    var rc = this.template( { farmer: this.farmer });
    this.$el.html(rc);
    return this;
  },

})