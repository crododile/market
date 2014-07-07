class MarketAttendance < ActiveRecord::Base
  belongs_to :farmer, foreign_key: :farmer_id, class_name: "Farmer"
  belongs_to :mrkt, foreign_key: :mrkt_id, primary_key: :fmid, class_name: "Mrkt"
end
