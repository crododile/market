class CreateShoppers < ActiveRecord::Migration
  def change
    create_table :shoppers do |t|
      t.string :name

      t.timestamps
    end
  end
end
