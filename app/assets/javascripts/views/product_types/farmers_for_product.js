Market.Views.FarmersForProductType = Backbone.View.extend({

  template: JST['product_types/farmers_for_product'],

  initialize: function () {
    this.listenTo(this.collection, 'sync add remove', this.render);
    this.collection.fetch({success: function(){$('button.add-map').trigger('click')}})
  },

  events: {
        "click button.leaveMarket":"leaveMarket",
        // "click button.add-map":"addMap",
   //      "click button.close-map":'closeMap'
      },

      closeMap: function(){
        $('button.close-map').toggleClass('close-map').toggleClass('add-map');
        $('button.add-map').text('Open Map')
        this.$el.find('#index-map').html("").removeAttr('style')
      },

      addMap: function(event){
        $(event.target).toggleClass('close-map').toggleClass('add-map');
        $(event.target).text('Close Map')

        this.mc = this.$el.find('#index-map');

        var map = new google.maps.Map(this.mc[0], {center: center, zoom: 15});
        this.collection.getMarkers(map)
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

  leaveMarket: function(event){
    event.preventDefault()
    $('button.close-map').trigger('click')
    var showDivClass = $(event.target).data('id')

    // var  ptName = $(event.target).parent().parent().data("type");
    // var $goToMarketButton = $('<button>');
    //
    // $goToMarketButton.addClass("btn btn-block btn-"+ptName);
    // $goToMarketButton.addClass("go-to-market");
    // $goToMarketButton.text(ptName)
    // $('div.'+ptName).html($goToMarketButton);
    $('div.map-canvas').html('')
    $('div.showDivclass').remove()
    this.remove()
  }
});