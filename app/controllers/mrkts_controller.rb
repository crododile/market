class MrktsController < ApplicationController
  
  def index
      @Mrkts = Mrkt.select(:marketname, :x, :y, :id)
      render :json => @Mrkts
  end
  
  def show
    @Mrkt = Mrkt.find(params[:id])
    render :json => @Mrkt
  end


end
