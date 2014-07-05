class MrktsController < ApplicationController
  
  def index
      @Mrkts = Mrkt.select(:marketname, :x, :y)
      render :json => @Mrkts
  end

end
