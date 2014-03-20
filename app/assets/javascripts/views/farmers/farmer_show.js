Market.Views.FarmerShow = Backbone.View.extend({
  initialize: function(options){
    this.name = options.name
    this.farmer = new Market.Models.Farmer( {name: options.name});
    this.farmer.fetch();
    this.listenTo(this.farmer, 'sync', this.render);
  },

  events: {
    "click button.add-market":"addMarket"
  },

  addMarket: function(){
    event.preventDefault();
    var newZips = $('input.add-market').val();
    this.farmer.save( {zipcodes: newZips }, {patch:true});
  },

  template: JST['farmers/show'],

  render: function(){

    var rc = this.template( { farmer: this.farmer });
    this.$el.html(rc);
    return this;
  },







})