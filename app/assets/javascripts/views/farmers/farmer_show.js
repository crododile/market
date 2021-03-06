Market.Views.FarmerShow = Backbone.View.extend({
  initialize: function (options) {
    this.name = options.name;
    this.farmer = new Market.Models.Farmer( { id: options.id });
    this.farmer.fetch();
    this.listenTo(this.farmer, 'sync', this.render);
  },

  template: JST['farmers/show'],

  events: {
    "click button.show-product":"showProduct"
  },

  showMap: function () {
	  var that = this
    if(!this.farmer.get('lat')){
      var streetAddress = $('.street-address').text().replace(/\s+/g,"")
      var city = $('.city').text().replace(/\s+/g,"")
      var state = $('.state').text().replace(/\s+/g,"")

      var uriQuery =
      "https://maps.googleapis.com/maps/api/geocode/json?address="+
      streetAddress+city+state+"&sensor=false&key="+maps_api_key

      var resp = $.ajax({
        url: uriQuery,
        type: 'GET',
        success: function (locdata) {
          var lat = locdata['results'][0]['geometry']['location']['lat']
          var lng = locdata['results'][0]['geometry']['location']['lng']
				  that.farmer.set({lat: lat, lng: lng})
				  that.farmer.save({lat: lat, lng: lng}, {patch:true})
        },
        error: function () {alert('geocoding error')}
      });
		}

   function mapInitializer (options) {
     var myLatLng
     if(this.farmer.get('lat')){
       myLatLng = new google.maps.LatLng(
         parseFloat(this.farmer.get('lat')), parseFloat(this.farmer.get('lng')) );
     } else {
       myLatLng = new google.maps.LatLng(options)
     }
      var mapOptions = {
        zoom: 15,
        center: myLatLng ,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      };

      var mc = this.$el.find('#map-canvas')[0]

      var map = new google.maps.Map(mc ,
          mapOptions);

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'marky'
      });
    }
    mapInitializer.call(this)
  },

  showProduct: function (event) {
    var id = $(event.target).data('id')
    var psView = new Market.Views.ProductShow({ id: id});
    $('#myModal h4.modal-title').html(psView.render().$el);
    $('div.modal-body').html(psView.$el2)
  },

  render: function () {
    var rc = this.template({ farmer: this.farmer });
    this.$el.html(rc);
		this.showMap();
    return this;
  },

})