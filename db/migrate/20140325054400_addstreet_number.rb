class AddstreetNumber < ActiveRecord::Migration
  def change
         add_column :farmers, :street_number, :string
  end
end
