class ProductManifestsController < ApplicationController
  def create
    @farmer = Farmer.find(1)
    debugger
    @farmer.product_manifests.create( listing_params );
    render "/farmers/farmer"
  end

  private
  def listing_params
    params.require(:product_manifest).permit(:description, :product_type_id);
  end




end
