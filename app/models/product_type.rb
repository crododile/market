# == Schema Information
#
# Table name: product_types
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class ProductType < ActiveRecord::Base
  has_many :product_listings, class_name: "ProductManifest"
  has_many :farmers, through: :product_listings
  has_many :shopping_lists
  has_many :shoppers, through: :shopping_lists
end
