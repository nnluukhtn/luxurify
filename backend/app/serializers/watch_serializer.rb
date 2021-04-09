# == Schema Information
#
# Table name: watches
#
#  id                     :bigint           not null, primary key
#  bracelet_color_name    :string
#  bracelet_material_name :string
#  brand_name             :string
#  bucket_material_name   :string
#  buckle_name            :string
#  case_diameter          :integer
#  case_material_name     :string
#  dial_color_name        :string
#  gender_name            :string
#  glass_name             :string
#  ipfs_hash              :string
#  model                  :string
#  movement_name          :string
#  name                   :string
#  power_reserve          :integer
#  price_fixed            :decimal(, )
#  price_type             :string
#  price_unit             :string
#  reference_number       :string
#  water_resistance_atm   :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  brand_id               :bigint
#  creator_id             :bigint
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
  attributes :name, :reference_number, :model, :power_reserve,
             :case_diameter, :water_resistance_atm, :movement_name,
             :bracelet_color_name, :dial_color_name, :gender_name,
             :buckle_name, :glass_name, :brand_name, :case_material_name,
             :bracelet_material_name, :bucket_material_name, :price_type, :price_unit, :price_fixed
  attributes :image_url, :inner_image_url, :token_uri

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

  def token_uri
    return unless object.ipfs_hash

    "#{ENV['PINATA_GATEWAY_API']}/#{object.ipfs_hash}"
  end
end
