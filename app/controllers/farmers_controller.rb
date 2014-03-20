class FarmersController < ApplicationController

  def create
    #current_user stuff?

    farmy = Farmer.new(farmer_params);
    farmy.save!()
    redirect_to "/"
  end

  private

  def farmer_params
    params.require('farmer').permit(:name, :zipcodes);
  end


end
