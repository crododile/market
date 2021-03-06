class ProductManifestsController < ApplicationController
  def show
    @product = ProductManifest.find(params[:id])
    @type = @product.product_type.name
    @farmerName = @product.farmer.name

    render 'product_manifests/product'
  end


  def create
    @farmer = current_farmer

    @product = @farmer.product_manifests.create( listing_params )
    @type = @product.product_type.name
    @farmerName = @product.farmer.name

    render 'product_manifests/product'
  end

  def destroy
    @product =  ProductManifest.find(params[:id])
    @product.destroy
    render :json  => @product
  end


  private
  def listing_params
    params.require(:product_manifest).permit(:description, :variety, :product_type_id)
  end




end
