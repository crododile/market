class MarketAttendancesController < ApplicationController
  def create
    newA = current_farmer.markets.create!( attendance_params )
    p newA
  end
  
  private
  def attendance_params
    params.permit(:fmid)
  end

end
