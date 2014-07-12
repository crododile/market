class AddIndexesToMarkets < ActiveRecord::Migration
  def change
    add_index :mrkts, :bakedgoods
    add_index :mrkts, :cheese
    add_index :mrkts, :crafts
    add_index :mrkts, :flowers
    add_index :mrkts, :eggs
    add_index :mrkts, :seafood
    add_index :mrkts, :herbs
    add_index :mrkts, :vegetables
    add_index :mrkts, :honey
    add_index :mrkts, :jams
    add_index :mrkts, :maple
    add_index :mrkts, :meat
    add_index :mrkts, :nursery 
    add_index :mrkts, :nuts 
    add_index :mrkts, :plants 
    add_index :mrkts, :poultry 
    add_index :mrkts, :prepared
    add_index :mrkts, :trees
    add_index :mrkts, :soap
    add_index :mrkts, :wine
  end
end

