class FarmersController < ApplicationController

  def show

    @farmer = Farmer.find_by_name(params[:id]);
    render "farmers/farmer"
  end


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
