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

class WatchSerializer < ActiveModel::Serializer
  attributes :name, :reference_number, :model, :brand_name,
             :price_type, :price_unit, :price_fixed
  attributes :image_url, :inner_image_url, :ipfs_data

  def image_url
    # object.image&.url
    image = object.image
    return unless image&.blob

    Rails.application.routes.url_helpers.url_for(image)
  end

  def inner_image_url
    # object.inner_image&.url
    inner_image = object.inner_image
    return unless inner_image&.blob

    Rails.application.routes.url_helpers.url_for(inner_image)
  end

  def ipfs_data
    JSON.parse(object.ipfs_data || '{}')
  end
end
