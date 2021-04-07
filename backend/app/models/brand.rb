# == Schema Information
#
# Table name: brands
#
#  id         :bigint           not null, primary key
#  category   :string
#  name       :string
#  status     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_brands_on_category  (category)
#  index_brands_on_name      (name)
#  index_brands_on_status    (status)
#

class Brand < ApplicationRecord
  include AASM

  enum status: {
    'active': 'active',
    'pending': 'pending',
    'inactive': 'inactive'
  }

  aasm column: 'status', enum: true do
    state :pending, initial: true
    state :active
    state :inactive

    event :approve do
      transitions from: :pending, to: :active
    end

    event :reject do
      transitions from: :pending, to: :inactive
    end

    event :deactivate do
      transitions from: :active, to: :inactive
    end

    event :reactivate do
      transitions from: :inactive, to: :active
    end
  end

  has_many :active_brand_users, -> { active }, class_name: 'BrandUser', dependent: :destroy
  has_many :active_users, through: :active_brand_users, source: :user
  has_many :pending_brand_users, -> { pending }, class_name: 'BrandUser', dependent: :destroy
  has_many :pending_users, through: :pending_brand_users, source: :user
  has_many :inactive_brand_users, -> { inactive }, class_name: 'BrandUser', dependent: :destroy
  has_many :inactive_users, through: :inactive_brand_users, source: :user
  has_one_attached :bir_2303_certification
  has_one_attached :certificate_of_registration
  has_many :watches

  validates :name, uniqueness: true, presence: true
  validates :status, presence: true
end
