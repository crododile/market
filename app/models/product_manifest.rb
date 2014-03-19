# == Schema Information
#
# Table name: product_manifests
#
#  id              :integer          not null, primary key
#  farmer_id       :integer
#  product_type_id :integer
#  created_at      :datetime
#  updated_at      :datetime
#

class ProductManifest < ActiveRecord::Base
  belongs_to :farmer
  belongs_to :product_type
end
