class ProductTypesController < ApplicationController

  def farmersIndex
    product_type = ProductType.find(params[:product_type_id])
    @farmers = product_type.farmers
    render "farmers/farmers_by_product_type"
  end

  def shoppersIndex
    product_type = ProductType.find(params[:product_type_id])
    @shoppers = product_type.shoppers
    render "shoppers/shoppers_by_product_type"
  end


end
