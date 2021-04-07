# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  confirmation_sent_at   :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable,
         :confirmable, :validatable, :timeoutable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_many :active_brand_users, -> { active }, class_name: 'BrandUser'
  has_many :active_brands, through: :active_brand_users, source: :brand
  has_many :pending_brand_users, -> { pending }, class_name: 'BrandUser'
  has_many :pending_brands, through: :pending_brand_users, source: :brand
  has_many :inactive_brand_users, -> { inactive }, class_name: 'BrandUser'
  has_many :inactive_brands, through: :inactive_brand_users, source: :brand
  has_many :watches, foreign_key: 'creator_id'
end
