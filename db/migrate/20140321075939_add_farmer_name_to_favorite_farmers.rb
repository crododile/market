class AddFarmerNameToFavoriteFarmers < ActiveRecord::Migration
  def change
    add_column :favorite_farmers, :farmer_name, :string
  end
end
