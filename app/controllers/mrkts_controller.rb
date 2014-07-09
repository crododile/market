class MrktsController < ApplicationController
  
  def index
    @Mrkts = Mrkt.select(:marketname, :x, :y, :id)
    render :json => @Mrkts
  end
  
  def show
    @Mrkt = Mrkt.includes(:attendees).find(params[:id])
    @Attendees = @Mrkt.attendees
    render 'mrkts/mrkt'
  end

end
