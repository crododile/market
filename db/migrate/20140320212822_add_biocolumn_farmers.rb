class AddBiocolumnFarmers < ActiveRecord::Migration
  def change
      add_column :farmers, :bio, :string
  end
end
