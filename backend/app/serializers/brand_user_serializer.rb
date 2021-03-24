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
