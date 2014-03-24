class AddCityToFarmers < ActiveRecord::Migration
  def change
    add_column :farmers, :city, :string
  end
end
