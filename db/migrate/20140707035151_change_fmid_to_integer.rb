class ChangeFmidToInteger < ActiveRecord::Migration
  def change
    change_column :mrkts, :fmid, 'integer USING CAST(fmid AS integer)'
  end
end
