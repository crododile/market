# == Schema Information
#
# Table name: mrkts
#
#  id          :integer          not null, primary key
#  fmid        :string(255)
#  marketname  :string(255)
#  website     :string(255)
#  street      :string(255)
#  city        :string(255)
#  county      :string(255)
#  state       :string(255)
#  zip         :string(255)
#  season1date :string(255)
#  season1time :string(255)
#  season2date :string(255)
#  season2time :string(255)
#  season3date :string(255)
#  season3time :string(255)
#  season4date :string(255)
#  season4time :string(255)
#  x           :decimal(7, 3)
#  y           :decimal(7, 3)
#  location    :string(255)
#  credit      :string(255)
#  wic         :string(255)
#  wiccash     :string(255)
#  sfmnp       :string(255)
#  snap        :string(255)
#  bakedgoods  :string(255)
#  cheese      :string(255)
#  crafts      :string(255)
#  flowers     :string(255)
#  eggs        :string(255)
#  seafood     :string(255)
#  herbs       :string(255)
#  vegetables  :string(255)
#  honey       :string(255)
#  jams        :string(255)
#  maple       :string(255)
#  meat        :string(255)
#  nursery     :string(255)
#  nuts        :string(255)
#  plants      :string(255)
#  poultry     :string(255)
#  prepared    :string(255)
#  soap        :string(255)
#  trees       :string(255)
#  wine        :string(255)
#  updatetime  :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#

class Mrkt < ActiveRecord::Base
  has_many :market_attendances, primary_key: :id, foreign_key: :mrkt_id, class_name: "MarketAttendance"
  has_many :attendees, through: :market_attendances, source: :farmer
end
