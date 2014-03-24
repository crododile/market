# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


product_types = [
  {name: "lamb"},
  {name:'other vegetables'},
  {name:'beef'},
  {name:'tomatoes'},
  {name:'lettuce'},
  {name:'greens'},
  {name:'pork'},
  {name:'poultry'},
  {name:'eggplant'},
  {name:'corn'},
  {name:'squash'},
  {name:'pumpkin'},
  {name:'goat'},
  {name:'fruit'},
]

ProductType.create!( product_types )


FactoryGirl.define do
  factory :farmer do
    name { Faker::Name.name }
    email { rand(100000).to_s + "@gmail.com" }
    password 'demodemo'
    zipcodes "37064,90210,43230"
    bio "WOW WE ALL HAVE THE SAME BIO!"
  end


  factory :product_manifest do
    farmer_id { 1 + rand(50) }
    product_type_id { 1 + rand(14) }
    variety { Faker::Commerce.product_name }
    description { Faker::Company.catch_phrase }
  end

end
50.times{ FactoryGirl.create :farmer }
30.times{ FactoryGirl.create :product_manifest }



