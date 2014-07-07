class CreateMarketAttendances < ActiveRecord::Migration
  def change
    create_table :market_attendances do |t|
      t.integer :farmer_id
      t.integer :mrkt_id

      t.timestamps
    end
  end
end
