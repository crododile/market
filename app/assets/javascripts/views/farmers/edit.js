Market.Views.FarmersEdit = Backbone.View.extend({
  template: JST['farmers/form'],
  tagName: 'form',

  initialize: function(){

    this.listenTo(this.model, 'sync', this.render);
    this.autocomplete = {};

    this.componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    };
  },

  events: {
    'click .make-farmer':'makeFarmer',
    'click .upload-image':'addImage'
  },

  addImage: function(event){
    event.preventDefault()
    var that = this
    var imgUrl;
    filepicker.pick(function(Inkblob){
      imgUrl = Inkblob.url;

      that.model.save( { farmer: { filepicker_url: imgUrl } }, { patch: true })
       $('.modal').modal('hide');
    });

  },

  makeFarmer: function(event){
    event.preventDefault();
    this.autocomplete.getPlace()

    var params = $('form').serializeJSON();
    params['farmer']['lat'] = this.autocomplete.getPlace().geometry.location.lat()
    params['farmer']['lng'] = this.autocomplete.getPlace().geometry.location.lng()

    this.model.save( params , { patch: true } );
    $('#edit-div').html('')
  },

  fillInAddress: function(ac) {
    // Get the place details from the autocomplete object.
    place = ac.getPlace();

    for (var component in this.componentForm) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (this.componentForm[addressType]) {
        var val = place.address_components[i][this.componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
  },


  render: function(){
    var rc = this.template( { farmer: this.model });
    this.$el.html(rc);
    var that = this

    this.autocomplete = new google.maps.places.Autocomplete(
      (this.$el.find('#autocomplete')[0]),
      { types: ['geocode'] });

    google.maps.event.addListener(this.autocomplete, 'place_changed', function() {
         that.fillInAddress(that.autocomplete).bind(that);
       });

    return this;
  },

})