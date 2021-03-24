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

    event :activate do
      transitions from: :pending, to: :active
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
