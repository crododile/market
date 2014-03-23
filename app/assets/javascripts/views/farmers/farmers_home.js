Market.Views.FarmerHome = Backbone.View.extend({
  initialize: function(){
    this.listenTo( this.model, 'sync', this.render);
    this.listenTo( this.collection, 'change', this.render );
  },

  template: JST['farmers/home'],

  events: {
    'click button.add-product':'addProduct',
    'click button.show-product':'showProduct',
    'click button.delete-product':'deleter',
 },

 hider: function(){
   alert('wut')
 },

 showProduct: function(){
   var id = $(event.target).data('id')
   var psView = new Market.Views.ProductShow({ id: id});
   $('#myModal2 h4.modal-title').html(psView.render().$el);
   $('div.modal-body').html(psView.$el2)

   var $delButton = $('<button>');

   $delButton.text('DELETE PRODUCT');
   $delButton.addClass('delete-product')
   $delButton.data('productid', id)
   $('div.modal-body').append( $delButton );

 },

 deleter: function(){

   dataId = $(event.target).data('productid')

   deadProduct = new Market.Models.ProductManifest( { id: dataId });
   var that = this

     deadProduct.destroy({
       success: function(){
         that.model.products().remove(deadProduct);
         $('#myModal2').modal('hide');

     }
   });
   $('#myModal2').on('hide.bs.modal', function(){ that.render() })
 },

  addProduct: function(){

    var apView = new Market.Views.ProductsNew({ collection: this.collection, model: this.model });
    apView.render()

    var that = this

    $('div.modal-body').html(apView.render().$el)
    $('#myModal').on('hide.bs.modal', function(){ that.render() })

  },

  render: function(){
    var rc = this.template( { farmer: this.model });
    this.$el.html(rc);
    return this;
  },

})