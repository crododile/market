class AddDescriptionToProductManifest < ActiveRecord::Migration
  def change
    add_column :product_manifests, :description, :string
  end
end
