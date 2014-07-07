# == Schema Information
#
# Table name: farmers
#
#  id                     :integer          not null, primary key
#  name                   :string(255)      default("Set Up Your Profile! Click Edit Profile Below")
#  created_at             :datetime
#  updated_at             :datetime
#  zipcodes               :string(255)
#  bio                    :string(255)
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  street_address         :string(255)
#  state                  :string(255)
#  postal_code            :string(255)
#  phone_number           :string(255)
#  contact_email          :string(255)
#  city                   :string(255)
#  country                :string(255)
#  route                  :string(255)
#  street_number          :string(255)
#  lat                    :string(255)
#  lng                    :string(255)
#  filepicker_url         :string(255)
#

class Farmer < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :product_manifests
  has_many :products, through: :product_manifests, source: :product_type
  has_many :favorite_farmers, foreign_key: :shopper_id
  has_many :market_attendances, primary_key: :id, foreign_key: :farmer_id, class_name: "MarketAttendance"
  has_many :markets, through: :market_attendances, source: :mrkt

end
