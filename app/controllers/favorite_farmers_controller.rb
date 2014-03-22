class FavoriteFarmersController < ApplicationController
  def create
    freshFave = FavoriteFarmer.create!(fave_params)
    render :json => freshFave
  end

  def destroy
    deadFave = FavoriteFarmer.find(params[:id]);
    deadFave.destroy();
    render :json => deadFave
  end

  def fave_params
    params.require(:favorite_farmer).permit(:shopper_id, :farmer_id, :product_favorited, :farmer_name )
  end



end
