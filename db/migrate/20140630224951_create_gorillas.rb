class CreateGorillas < ActiveRecord::Migration
  def change
    create_table :gorillas do |t|
      t.string :fmid
      t.string :marketname
      t.string :website
      t.string :street
      t.string :city
      t.string :county
      t.string :state
      t.string :zip
      t.string :season1date
      t.string :season1time
      t.string :season2date
      t.string :season2time
      t.string :season3date
      t.string :season3time
      t.string :season4date
      t.string :season4time
      t.string :x
      t.string :y
      t.string :location
      t.string :credit
      t.string :wic
      t.string :wiccash
      t.string :sfmnp
      t.string :snap
      t.string :bakedgoods
      t.string :cheese
      t.string :crafts
      t.string :flowers
      t.string :eggs
      t.string :seafood
      t.string :herbs
      t.string :vegetables
      t.string :honey
      t.string :jams
      t.string :maple
      t.string :meat
      t.string :nursery
      t.string :nuts
      t.string :plants
      t.string :poultry
      t.string :prepared
      t.string :soap
      t.string :trees
      t.string :wine
      t.string :updatetime

      t.timestamps
    end
  end
end
