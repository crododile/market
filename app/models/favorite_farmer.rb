# == Schema Information
#
# Table name: favorite_farmers
#
#  id                :integer          not null, primary key
#  shopper_id        :integer
#  farmer_id         :integer
#  product_favorited :string(255)
#  created_at        :datetime
#  updated_at        :datetime
#  farmer_name       :string(255)
#

class FavoriteFarmer < ActiveRecord::Base
  belongs_to :shopper, foreign_key: :shopper_id, class_name: "Farmer"
  belongs_to :farmer, foreign_key: :farmer_id, class_name: "Farmer"
end
