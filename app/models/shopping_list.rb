# == Schema Information
#
# Table name: shopping_lists
#
#  id              :integer          not null, primary key
#  shopper_id      :integer
#  product_type_id :integer
#  created_at      :datetime
#  updated_at      :datetime
#

class ShoppingList < ActiveRecord::Base
  belongs_to :shopper
  belongs_to :product_type
end
