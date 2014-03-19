# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

farmers = Farmer.create([{ name: "sam"}, {name: 'becca'}])

product_types = ProductType.create([{name: "lamb"},{name:'vegetables'}])


shoppers = Shopper.create(
    [{name: "carnivore"},
      {name: "herbivore"},
      {name: "omnivore"}])

product_manifests = ProductManifest.create(
      [{farmer_id: 1, product_type_id: 1},
        {farmer_id: 2, product_type_id: 2}])

shopping_lists = ShoppingList.create(
      [{shopper_id: 1, product_type_id: 1},
        {shopper_id: 2, product_type_id: 2},
        {shopper_id: 3, product_type_id: 1},
        {shopper_id: 3, product_type_id: 2}])



