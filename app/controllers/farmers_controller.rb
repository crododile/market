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
    #current_user stuff?
    debugger
    @farmer = Farmer.new(farmer_params);
    @farmer.save!()
    render "farmers/farmer"
  end

  private

  def farmer_params
    params.require(:farmer).permit(:name, :zipcodes);
  end

end
