class MarketAttendancesController < ApplicationController
  def create
    newA = current_farmer.market_attendances.create!( attendance_params )
    render :json => newA
  end
  
  private
  def attendance_params
    params.require(:market_attendance).permit(:mrkt_id)
  end
end
