class AddMarketsAndLocation < ActiveRecord::Migration
  def change
    add_column :farmers, :street_address, :string
    add_column :farmers, :state, :string
    add_column :farmers, :postal_code, :string
    add_column :farmers, :phone_number, :string
    add_column :farmers, :contact_email, :string
  end
end
