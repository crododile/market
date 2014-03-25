class AddPicToFarmer < ActiveRecord::Migration
  def change
    add_column :farmers, :filepicker_url, :string
  end
end
