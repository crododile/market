class CreateProductManifests < ActiveRecord::Migration
  def change
    create_table :product_manifests do |t|
      t.integer :farmer_id
      t.integer :product_type_id

      t.timestamps
    end
  end
end
