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

ActiveRecord::Schema.define(version: 20140324190420) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "farmers", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "zipcodes"
    t.string   "bio"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
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
