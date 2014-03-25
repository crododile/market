class Addlatlng < ActiveRecord::Migration
  def change
    add_column :farmers, :lat, :string
    add_column :farmers, :lng, :string
  end
end
