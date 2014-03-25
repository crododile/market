class Addcountryandstreetaddresstofarmers < ActiveRecord::Migration
  def change
     add_column :farmers, :country, :string
     add_column :farmers, :route, :string
  end
end
