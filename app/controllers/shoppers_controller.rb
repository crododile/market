class ShoppersController < ApplicationController

  def show
    @shopper = Shopper.find(params[:id]);
    render "shoppers/shopper"
  end

end
