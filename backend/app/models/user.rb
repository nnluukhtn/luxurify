class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :confirmable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_many :active_brand_users, -> { active }, class_name: 'BrandUser'
  has_many :active_brands, through: :active_brand_users, source: :brand
  has_many :pending_brand_users, -> { pending }, class_name: 'BrandUser'
  has_many :pending_brands, through: :pending_brand_users, source: :brand
  has_many :inactive_brand_users, -> { inactive }, class_name: 'BrandUser'
  has_many :inactive_brands, through: :inactive_brand_users, source: :brand
end
