# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

PRODUCT_TYPES =[
  "bakedgoods",
  "cheese",
  "crafts",
  "flowers",
  "eggs",
  "seafood",
  "herbs",
  "vegetables",
  "honey",
  "jams",
  "maple",
  "meat",
  "nursery",
  "nuts",
  "plants",
  "poultry",
  "prepared",
  "trees",
  "soap",
  "wine"]
  
  new_product_types =[
    {:name=>"bakedgoods"},
    {:name=>"cheese"},
    {:name=>"crafts"},
    {:name=>"flowers"},
    {:name=>"eggs"},
    {:name=>"seafood"},
    {:name=>"herbs"},
    {:name=>"vegetables"}, 
    {:name=>"honey"}, 
    {:name=>"jams"},
    {:name=>"maple"},
    {:name=>"meat"}, 
    {:name=>"nursery"}, 
    {:name=>"nuts"},
    {:name=>"nursery"}, 
    {:name=>"plants"}, 
    {:name=>"poultry"},
    {:name=>"prepared"},
    {:name=>"trees"}, 
    {:name=>"soap"},
    {:name=>"wine"}]

ProductType.create! new_product_types 

FactoryGirl.define do
  sequence :email do |n|
    "#{n}@gmail.com"
  end

  factory :farmer do
    name { Faker::Name.name }
    email
    password 'demodemo'
    zipcodes "37064,90210,43230"
    bio "WOW WE ALL HAVE THE SAME BIO!"

    street_address { Faker::Address.street_address }
    city {Faker::Address.city}
    state { Faker::Address.state }
    postal_code { Faker::Address.zip_code }
    phone_number { Faker::PhoneNumber.phone_number }
    contact_email { Faker::Internet.email }
  end

  factory :product_manifest do
    farmer_id { 1 + rand(50) }
    product_type_id { 1 + rand(21) }
    variety { Faker::Commerce.product_name }
    description { Faker::Company.catch_phrase }
  end
end

50.times{ FactoryGirl.create :farmer }
30.times{ FactoryGirl.create :product_manifest }



