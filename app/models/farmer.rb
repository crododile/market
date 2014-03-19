# == Schema Information
#
# Table name: farmers
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Farmer < ActiveRecord::Base

  has_many :product_manifests
  has_many :products, through: :product_listings, source: :product_type

end
