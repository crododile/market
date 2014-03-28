Market.Views.FarmerShow = Backbone.View.extend({
  initialize: function(options){
    this.name = options.name

    this.farmer = new Market.Models.Farmer( { name: options.name });

    this.farmer.fetch();
    this.listenTo(this.farmer, 'sync', this.render);

  },

  template: JST['farmers/show'],

  events: {
    "click button.show-product":"showProduct",
    "click button.add-map":"showMap",
    "click button.close-map":"closeMap"
  },


  closeMap: function(){
    this.$el.find('#map-canvas').html("").removeAttr('style')
    $(event.target).toggleClass('close-map').toggleClass('add-map');
    $(event.target).show()
    $(event.target).text('Open Map')
  },

  showMap: function(event) {
    event.preventDefault();

    $(event.target).toggleClass('close-map').toggleClass('add-map');

    $(event.target).text('Close Map')


    if(!this.farmer.get('lat'))
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
     var myLatLng
     if(this.farmer.get('lat')){
       myLatLng = new google.maps.LatLng(
         parseFloat(this.farmer.get('lat')), parseFloat(this.farmer.get('lng')) );
     } else {
       myLatLng = new google.maps.LatLng(options)
       console.log(myLatLng)
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

    initialize.call(this)
  },




  showProduct: function(event){
    var id = $(event.target).data('id')
    var psView = new Market.Views.ProductShow({ id: id});

    $('#myModal h4.modal-title').html(psView.render().$el);
    $('div.modal-body').html(psView.$el2)

  },


  render: function(){
    var rc = this.template( { farmer: this.farmer });
    this.$el.html(rc);
    $('button.add-map').trigger('click')
    return this;
  },

})