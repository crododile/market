# == Schema Information
#
# Table name: farmers
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#  zipcodes   :string(255)
#

class Farmer < ActiveRecord::Base
  #has_many actual_products --->actual product descriptions rather than only type
  has_many :product_manifests
  has_many :products, through: :product_manifests, source: :product_type
  #may not need to go all the way to shoppers here
  has_many :shoppers, through: :products

end
