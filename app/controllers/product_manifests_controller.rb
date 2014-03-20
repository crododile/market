class ProductManifestsController < ApplicationController
  def show
    @product = ProductManifest.find(params[:id])
    @type = @product.product_type.name
    @farmerName = @product.farmer.name

    render 'product_manifests/product'
  end


  def create
    @farmer = Farmer.find(1)

    @farmer.product_manifests.create( listing_params );
    render "/farmers/farmer"
  end

  private
  def listing_params
    params.require(:product_manifest).permit(:description, :product_type_id);
  end




end
