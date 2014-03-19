class CreateShoppingLists < ActiveRecord::Migration
  def change
    create_table :shopping_lists do |t|
      t.integer :shopper_id

      t.integer :product_type_id

      t.timestamps
    end
  end
end
