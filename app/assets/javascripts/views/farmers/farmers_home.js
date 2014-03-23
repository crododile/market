Market.Views.FarmerHome = Backbone.View.extend({
  initialize: function(){
    this.listenTo( this.model, 'sync', this.render);
    this.listenTo (this.collection, 'change', this.render );
  },

  template: JST['farmers/home'],

  events: {
    'click button.add-product':'addProduct',
    'click button.show-product':'showProduct'
 },

 showProduct: function(){
   var id = $(event.target).data('id')
   var psView = new Market.Views.ProductShow({ id: id});
   $('#myModal2 h4.modal-title').html(psView.render().$el);
   $('div.modal-body').html(psView.$el2)

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