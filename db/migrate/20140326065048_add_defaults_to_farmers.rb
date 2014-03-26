class AddDefaultsToFarmers < ActiveRecord::Migration
  def change
    change_column :farmers, :name, :string, :default => "Set Up Your Profile! Click Edit Profile Below"
  end
end
