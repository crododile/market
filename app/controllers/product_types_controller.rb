class ProductTypesController < ApplicationController

  before_filter :require_signed_in

  def farmersIndex
    product_type = ProductType.find(params[:product_type_id])

    @farmers = product_type.farmers

    render "/farmers/farmers_by_product_type"
  end


  def index
    @product_types = ProductType.all

    render "/product_types/product_types"
  end



end
