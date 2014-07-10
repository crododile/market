class MarketAttendancesController < ApplicationController
  def create
    newA = current_farmer.market_attendances.create!( attendance_params )
    render :json => {}
  end
  
  def destroy
    @attendance = MarketAttendance.where({farmer_id: current_farmer.id, mrkt_id: params[:id]})
    @attendance.destroy_all
    render :json => {}
  end
  
  private
  def attendance_params
    params.require(:market_attendance).permit(:mrkt_id)
  end
end
