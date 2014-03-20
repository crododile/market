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
#

class FavoriteFarmer < ActiveRecord::Base
  belongs_to :shopper
end
