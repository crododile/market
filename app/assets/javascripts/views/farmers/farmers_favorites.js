Market.Views.FarmersFavorites = Backbone.View.extend({

  template: JST['farmers/favorites'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.favorite_farmers(), "change sync", this.render)
  },

  events: {
    'sortupdate':'sortStuff',
    'click button.delete-button':'deleter',
		'click button.visit-button':'visiter'
  },
  
  visiter: function(){
	  Backbone.history.navigate( $(event.target).attr('href'), {trigger: true})
  },

  deleter: function(event){
    dataId = $(event.target.parentElement).data('id')
    deadModel = this.model.favorite_farmers().get( dataId )
    event.target.parentElement.remove();
    deadModel.destroy()
    this.render()
  },

  sortStuff: function(event, ui){
    var fName = $(ui.item).find('.thumbnail-fname').text().trim();
    var fId = $(ui.item).find('.thumbnail-fname').data('id');
    var pType = $(ui.item).find(".thumbnail-product").data('type');
		var fPicker = $($(ui.item).find(".thumbnail-image-container").children()[0]).attr('src');
	
    var nFave = new Market.Models.FavoriteFarmer({
      shopper_id: this.model.id, farmer_id: fId,
      product_favorited: pType, farmer_name: fName,
		  filepicker_url: fPicker
    });

    nFave.save({ success: function(){ console.log('ho') } })
	
    this.model.favorite_farmers().add(nFave);
  },

  render: function () {
    var rc = this.template( {farmer: this.model} );
    this.$el.html(rc);

    var $delButton = $('<button>');
    $delButton.addClass('delete-button btn-danger');
    $delButton.html( 'X');
	
    var $visitButton = $('<button>');
    $visitButton.addClass('visit-button btn-success');
    $visitButton.text('Visit');
	
    var that = this
    $('.dropdown-menu').empty()
		$('.dropdown-menu').append('<li>Products Added in Past 3 days</li>')
	
    $.ajax({
      url: "/feed",
      type: "GET",
      success: function(respData){
        var $freshie, $flink
        respData.forEach( function(frsh){
          $freshie = $('<li>')
          $flink = $('<a>')
          $flink.attr('href', '/#/farmers/'+frsh['farmer_id'])
          $flink.text("new " + frsh['product_favorited'] + " from " + frsh['farmer_name'])
	
          $freshie.html($flink)
          $('.dropdown-menu').append($freshie)
        })
      },
    });

    $('.favorite-farmers .farmer-thumbnail').hover(
        function(event){ $(event.currentTarget).append( $delButton );
			  $visitButton.attr('href', $(event.currentTarget).find('a').attr('href') );
   		  $(event.currentTarget).append( $visitButton ) 
	    },
	    function(){  
			  $delButton.remove();
	      $visitButton.remove()
	    }
    );
    return this
  }

});
