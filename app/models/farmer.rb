# == Schema Information
#
# Table name: farmers
#
#  id                     :integer          not null, primary key
#  name                   :string(255)
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
#

class Farmer < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  #has_many actual_products --->actual product descriptions rather than only type
  has_many :product_manifests
  has_many :products, through: :product_manifests, source: :product_type

  has_many :favorite_farmers, foreign_key: :shopper_id

  # has_many :chosen_farmers, foreign_key: :shopper_id, class_name: "FavoriteFarmer"
  # has_many :collected_farmers, though: :chosen_farmers, source: :farmer

end
