class FavoriteFarmersController < ApplicationController
  def create
    freshFave = FavoriteFarmer.create!(fave_params)
    render :json => freshFave
  end

  def feed

    @feedFarmers = FavoriteFarmer.find_by_sql([
    " SELECT favorite_farmers.farmer_name, favorite_farmers.product_favorited
    FROM product_manifests
    JOIN favorite_farmers
    ON product_manifests.farmer_id = favorite_farmers.farmer_id
    WHERE product_manifests.created_at > ? AND favorite_farmers.shopper_id = ?
    ORDER BY product_manifests.created_at",
     3.days.ago, current_farmer.id
    ])

    # @feedVarieties = ProductManifest.find_by_sql([
 #    " SELECT product_manifests.variety,
 #    FROM product_manifests
 #    JOIN favorite_farmers
 #    ON product_manifests.farmer_id = favorite_farmers.farmer_id
 #    WHERE product_manifests.created_at > ?AND favorite_farmers.shopper_id = ?
 #    ORDER BY product_manifests.created_at",
 #     3.days.ago, params[:id]
 #     ])


     render 'favorite_farmers/feed'

  end


  def destroy
    deadFave = FavoriteFarmer.find(params[:id])
    deadFave.destroy
    render :json => deadFave
  end

  def fave_params
    params.require(:favorite_farmer).permit(:shopper_id, :farmer_id, :product_favorited, :farmer_name )
  end



end
