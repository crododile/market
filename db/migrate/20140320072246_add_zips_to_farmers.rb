class AddZipsToFarmers < ActiveRecord::Migration
  def change
    add_column :farmers, :zipcodes, :string
  end
end
