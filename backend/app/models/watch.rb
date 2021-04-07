# == Schema Information
#
# Table name: watches
#
#  id               :bigint           not null, primary key
#  brand_name       :string
#  ipfs_data        :jsonb
#  model            :string
#  name             :string
#  price_fixed      :decimal(, )
#  price_type       :string
#  price_unit       :string
#  reference_number :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  brand_id         :bigint
#  creator_id       :bigint
#
# Indexes
#
#  index_watches_on_brand_id          (brand_id)
#  index_watches_on_brand_name        (brand_name)
#  index_watches_on_creator_id        (creator_id)
#  index_watches_on_name              (name)
#  index_watches_on_reference_number  (reference_number)
#

class Watch < ApplicationRecord
  belongs_to :creator, class_name: 'User', optional: true
  belongs_to :brand, optional: true
  has_one_attached :image
  has_one_attached :inner_image

  enum price_type: {
    'fixed': 'fixed',
    'dynamic': 'dynamic'
  }
end
