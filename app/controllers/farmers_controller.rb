class FarmersController < ApplicationController

  def current
    @farmer = current_farmer
    render "farmers/farmer"
  end

  def show
    @farmer = Farmer.find_by_name(params[:id]);

    render "farmers/farmer"
  end

  def update
    @farmer = current_farmer;
    @farmer.update( farmer_params )
    render "farmers/farmer"
  end


  def create
    @farmer = Farmer.new(farmer_params);
    @farmer.save!()
    render "farmers/farmer"
  end

  private

  def farmer_params
    params.require(:farmer).permit(:name, :zipcodes, :bio, :city, :state,
    :street_address, :postal_code, :contact_email, :phone_number);
  end

  def fave_params
    params.require(:fave).permit(:farmer_id, :product_favorited)
  end


end
