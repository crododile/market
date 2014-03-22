class FavoriteFarmersController < ApplicationController
  def create
    freshFave = FavoriteFarmer.create!(fave_params)
    status :ok
  end

  def destroy
    deadFave = FavoriteFarmer.find(params[:id]);
    deadFave.destroy();
    status :ok
  end

  def fave_params
    params.require(:favorite_farmer).permit(:shopper_id, :farmer_id, :product_favorited, :farmer_name )
  end



end
