# == Schema Information
#
# Table name: brand_users
#
#  id         :bigint           not null, primary key
#  status     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  brand_id   :bigint
#  user_id    :bigint
#
# Indexes
#
#  index_brand_users_on_brand_id  (brand_id)
#  index_brand_users_on_status    (status)
#  index_brand_users_on_user_id   (user_id)
#

class BrandUser < ApplicationRecord
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

  belongs_to :user
  belongs_to :brand
end
