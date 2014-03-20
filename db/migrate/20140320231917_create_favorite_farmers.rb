class CreateFavoriteFarmers < ActiveRecord::Migration
  def change
    create_table :favorite_farmers do |t|
      t.integer :shopper_id
      t.integer :farmer_id
      t.string :product_favorited

      t.timestamps
    end
  end
end
