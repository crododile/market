class MrktsController < ApplicationController
  
  def index
      @Mrkts = Mrkt.pluck(:marketname, :x, :y)
      render :json => @Mrkts
  end

end
