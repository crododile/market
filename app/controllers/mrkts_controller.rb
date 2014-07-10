class MrktsController < ApplicationController
  
  def index
    @Mrkts = Mrkt.select(:marketname, :x, :y, :id)
    render :json => @Mrkts
  end
  
  def show
    @Mrkt = Mrkt.includes(:attendees).find(params[:id])
    @Attendees = @Mrkt.attendees
    @attended_by_user = @Mrkt.attendees.all.include?(current_farmer)
    render 'mrkts/mrkt'
  end

end
