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

class BrandUserSerializer < ActiveModel::Serializer
  attributes :id, :brand, :user, :status, :created_at

  def brand
    ActiveModelSerializers::SerializableResource.new(
      object.brand, serializer: ::BrandSerializer
    ).as_json
  end

  def user
    ActiveModelSerializers::SerializableResource.new(
      object.user, serializer: ::UserSerializer
    ).as_json
  end
end
