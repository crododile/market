class AddVarietiesToProducts < ActiveRecord::Migration
  def change
    add_column :product_manifests, :variety, :string
  end
end
