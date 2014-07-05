class MrktsController < ApplicationController
  
  def index
      @Mrkts = Mrkt.select(:marketname, :x, :y, :fmid)
      render :json => @Mrkts
  end
  
  def show
    @Mrkt = Mrkt.find_by_fmid(params[:id])
    p @Mrkt
    render :json => @Mrkt
  end


end
