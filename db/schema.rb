# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140712021631) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "farmers", force: true do |t|
    t.string   "name",                   default: "Set Up Your Profile! Click Edit Profile Below"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "zipcodes"
    t.string   "bio"
    t.string   "email",                  default: "",                                              null: false
    t.string   "encrypted_password",     default: "",                                              null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,                                               null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "street_address"
    t.string   "state"
    t.string   "postal_code"
    t.string   "phone_number"
    t.string   "contact_email"
    t.string   "city"
    t.string   "country"
    t.string   "route"
    t.string   "street_number"
    t.string   "lat"
    t.string   "lng"
    t.string   "filepicker_url"
  end

  add_index "farmers", ["email"], name: "index_farmers_on_email", unique: true, using: :btree
  add_index "farmers", ["reset_password_token"], name: "index_farmers_on_reset_password_token", unique: true, using: :btree

  create_table "favorite_farmers", force: true do |t|
    t.integer  "shopper_id"
    t.integer  "farmer_id"
    t.string   "product_favorited"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "farmer_name"
  end

  create_table "gorillas", force: true do |t|
    t.string   "fmid"
    t.string   "marketname"
    t.string   "website"
    t.string   "street"
    t.string   "city"
    t.string   "county"
    t.string   "state"
    t.string   "zip"
    t.string   "season1date"
    t.string   "season1time"
    t.string   "season2date"
    t.string   "season2time"
    t.string   "season3date"
    t.string   "season3time"
    t.string   "season4date"
    t.string   "season4time"
    t.string   "x"
    t.string   "y"
    t.string   "location"
    t.string   "credit"
    t.string   "wic"
    t.string   "wiccash"
    t.string   "sfmnp"
    t.string   "snap"
    t.string   "bakedgoods"
    t.string   "cheese"
    t.string   "crafts"
    t.string   "flowers"
    t.string   "eggs"
    t.string   "seafood"
    t.string   "herbs"
    t.string   "vegetables"
    t.string   "honey"
    t.string   "jams"
    t.string   "maple"
    t.string   "meat"
    t.string   "nursery"
    t.string   "nuts"
    t.string   "plants"
    t.string   "poultry"
    t.string   "prepared"
    t.string   "soap"
    t.string   "trees"
    t.string   "wine"
    t.string   "updatetime"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "items", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.float    "decimal"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "type"
  end

  create_table "market_attendances", force: true do |t|
    t.integer  "farmer_id"
    t.integer  "mrkt_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "mrkts", force: true do |t|
    t.integer  "fmid"
    t.string   "marketname"
    t.string   "website"
    t.string   "street"
    t.string   "city"
    t.string   "county"
    t.string   "state"
    t.string   "zip"
    t.string   "season1date"
    t.string   "season1time"
    t.string   "season2date"
    t.string   "season2time"
    t.string   "season3date"
    t.string   "season3time"
    t.string   "season4date"
    t.string   "season4time"
    t.decimal  "x",           precision: 7, scale: 3
    t.decimal  "y",           precision: 7, scale: 3
    t.string   "location"
    t.string   "credit"
    t.string   "wic"
    t.string   "wiccash"
    t.string   "sfmnp"
    t.string   "snap"
    t.string   "bakedgoods"
    t.string   "cheese"
    t.string   "crafts"
    t.string   "flowers"
    t.string   "eggs"
    t.string   "seafood"
    t.string   "herbs"
    t.string   "vegetables"
    t.string   "honey"
    t.string   "jams"
    t.string   "maple"
    t.string   "meat"
    t.string   "nursery"
    t.string   "nuts"
    t.string   "plants"
    t.string   "poultry"
    t.string   "prepared"
    t.string   "soap"
    t.string   "trees"
    t.string   "wine"
    t.string   "updatetime"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "mrkts", ["bakedgoods"], name: "index_mrkts_on_bakedgoods", using: :btree
  add_index "mrkts", ["cheese"], name: "index_mrkts_on_cheese", using: :btree
  add_index "mrkts", ["crafts"], name: "index_mrkts_on_crafts", using: :btree
  add_index "mrkts", ["eggs"], name: "index_mrkts_on_eggs", using: :btree
  add_index "mrkts", ["flowers"], name: "index_mrkts_on_flowers", using: :btree
  add_index "mrkts", ["herbs"], name: "index_mrkts_on_herbs", using: :btree
  add_index "mrkts", ["honey"], name: "index_mrkts_on_honey", using: :btree
  add_index "mrkts", ["jams"], name: "index_mrkts_on_jams", using: :btree
  add_index "mrkts", ["maple"], name: "index_mrkts_on_maple", using: :btree
  add_index "mrkts", ["meat"], name: "index_mrkts_on_meat", using: :btree
  add_index "mrkts", ["nursery"], name: "index_mrkts_on_nursery", using: :btree
  add_index "mrkts", ["nuts"], name: "index_mrkts_on_nuts", using: :btree
  add_index "mrkts", ["plants"], name: "index_mrkts_on_plants", using: :btree
  add_index "mrkts", ["poultry"], name: "index_mrkts_on_poultry", using: :btree
  add_index "mrkts", ["prepared"], name: "index_mrkts_on_prepared", using: :btree
  add_index "mrkts", ["seafood"], name: "index_mrkts_on_seafood", using: :btree
  add_index "mrkts", ["soap"], name: "index_mrkts_on_soap", using: :btree
  add_index "mrkts", ["trees"], name: "index_mrkts_on_trees", using: :btree
  add_index "mrkts", ["vegetables"], name: "index_mrkts_on_vegetables", using: :btree
  add_index "mrkts", ["wine"], name: "index_mrkts_on_wine", using: :btree

  create_table "product_manifests", force: true do |t|
    t.integer  "farmer_id"
    t.integer  "product_type_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "description"
    t.string   "variety"
  end

  create_table "product_types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
