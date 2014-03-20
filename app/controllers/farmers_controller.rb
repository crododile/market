class FarmersController < ApplicationController

  def create
    #current_user stuff?

    @farmer = Farmer.new(farmer_params);
    @farmer.save!()
  end

  private

  def farmer_params
    params.require('farmer').permit(:name, :zipcodes);
  end


end
