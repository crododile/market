Market.Views.FarmerShow = Backbone.View.extend({
  initialize: function(options){
    this.name = options.name

    this.farmer = new Market.Models.Farmer( { name: options.name });

    this.farmer.fetch();
    this.listenTo(this.farmer, 'sync', this.render);

  },

  events: {
    "click button.show-product":"showProduct",
    "click button.visit-us":"showMap"
  },

  showMap: function(event) {
    event.preventDefault();
    var streetAddress = $('.street-address').text().replace(/\s+/g,"")
    var city = $('.city').text().replace(/\s+/g,"")
    var state = $('.state').text().replace(/\s+/g,"")

    var uriQuery =
    "https://maps.googleapis.com/maps/api/geocode/json?address="+
    streetAddress+city+state+"&sensor=false&key="+maps_api_key

    var resp = $.ajax({
      url: uriQuery,
      type: 'GET',
      success: function(locdata){
        var lat = locdata['results'][0]['geometry']['location']['lat']
        var lng = locdata['results'][0]['geometry']['location']['lng']
        initialize({lat:lat, lng: lng})
      },
      error: function(){alert('wut')}
    });


   function initialize (options) {

     var myLatLng = new google.maps.LatLng( options['lat'], options['lng'] );

      var mapOptions = {
       // useStaticMap: false,
        zoom: 8,
        center: myLatLng ,
      };


      var map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);
          console.log('once')

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'marky'
      });

    }
  },

  showProduct: function(event){
    var id = $(event.target).data('id')
    var psView = new Market.Views.ProductShow({ id: id});

    $('#myModal h4.modal-title').html(psView.render().$el);
    $('div.modal-body').html(psView.$el2)

  },

  template: JST['farmers/show'],

  render: function(){
    var rc = this.template( { farmer: this.farmer });
    this.$el.html(rc);

    return this;
  },

})