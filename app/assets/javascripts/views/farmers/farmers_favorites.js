Market.Views.FarmersFavorites = Backbone.View.extend({

  template: JST['farmers/favorites'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.favorite_farmers(), "add", this.render)
  },

  events: {
    'sortupdate':'sortStuff',
    'click button.delete-button':'deleter'
  },

  deleter: function(){
    dataId = $(event.target.parentElement).data('id')
    deadModel = this.model.favorite_farmers().get( dataId )
    event.target.parentElement.remove();
    deadModel.destroy()
  },

  sortStuff: function(event, ui){
    var fName = $(ui.item).find('.thumbnail-fname').text().trim()
    var fId = $(ui.item).find('.thumbnail-fname').data('id')
    var pType = $(ui.item).find('.thumbnail-product').text().trim()

    var nFave = new Market.Models.FavoriteFarmer({
      shopper_id: this.model.id, farmer_id: fId,
      product_favorited: pType, farmer_name: fName
    });

    nFave.save({ success: function(){ alert(saved) } })

    this.model.favorite_farmers().add(nFave);
  },

  render: function(){
    var rc = this.template( {farmer: this.model} );
    this.$el.html(rc);

    var $delButton = $('<button>');
    $delButton.addClass('delete-button');
    $delButton.text('X');
    var that = this

    $.ajax({
      url: "/feed",
      type: "GET",
      success: function(respData){
        var $freshie, $flink
        respData.forEach( function(frsh){
          $freshie = $('<li>')
          $flink = $('<a>')
          $flink.attr('href', '/#/farmers/'+frsh['farmer_name'])
          $flink.text("new " + frsh['product_favorited'] + " from " + frsh['farmer_name'])
          debugger
          $freshie.html($flink)
          $('.dropdown-menu').append($freshie)
        })
      }
    });


    $('.connected-lists').sortable( { connectWith: ".connected-lists" } );
    $('.favorite-farmers .farmer-thumbnail').hover(

      function(){  $(event.currentTarget).append( $delButton ) },
      function(){  $delButton.remove() }
    );
    return this
  }

});
