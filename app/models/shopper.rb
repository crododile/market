# == Schema Information
#
# Table name: shoppers
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Shopper < ActiveRecord::Base
  has_many :shopping_lists
  has_many :desires, through: :shopping_lists, source: :product_type
end
