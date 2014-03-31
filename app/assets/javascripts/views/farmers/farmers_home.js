Market.Views.FarmerHome = Backbone.View.extend({
  initialize: function(){
    this.listenTo( this.model, 'sync', this.render);
    this.listenTo( this.collection, 'add change', this.render );

    this.componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    };
  },

  template: JST['farmers/home'],

  events: {
    'click button.add-product':'addProduct',
    'click button.show-product':'showProduct',
    'click button.delete-product':'deleter',
    'click button.edit-profile':'editProfile',
    'click button.make-farmer':'closeEdit'
 },

 closeEdit: function(){
   $('#myModal').modal('hide');
 },

 editProfile: function(){

   var nfView = new Market.Views.FarmersEdit({ model: this.model });
   var that = this;
   nfView.render()

   $('div.modal-body').html(nfView.render().$el)
   $('#myModal h4.modal-title').html("EDIT PROFILE");

   $('#myModal').on('hide.bs.modal', function(){ that.render() })
 },


 showProduct: function(event){
   var id = $(event.target).data('id')
   var psView = new Market.Views.ProductShow({ id: id});
   $('#myModal h4.modal-title').html(psView.render().$el);
   $('div.modal-body').html(psView.$el2)

   var $delButton = $('<button>');

   $delButton.text('DELETE PRODUCT');
   $delButton.addClass('delete-product')
   $delButton.data('productid', id)
   $('div.modal-body').append( $delButton );

 },

 deleter: function(event){

   dataId = $(event.target).data('productid')

   deadProduct = new Market.Models.ProductManifest( { id: dataId });
   var that = this

     deadProduct.destroy({
       success: function(){
         that.model.products().remove(deadProduct);
         $('#myModal').modal('hide');

     }
   });

   $('#myModal').on('hide.bs.modal', function(){ that.render() })
 },

  addProduct: function(){

    var apView = new Market.Views.ProductsNew({ collection: this.collection, model: this.model });
    apView.render()

    var that = this

    $('div.modal-body').html(apView.render().$el)
    $('#myModal').on('hide.bs.modal', function(){ debugger; that.render() })

  },

  render: function(){
    var rc = this.template( { farmer: this.model });
    this.$el.html(rc);
    return this;
  },

})