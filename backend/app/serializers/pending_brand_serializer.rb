class PendingBrandSerializer < BrandSerializer
  attributes :users

  def users
    ActiveModelSerializers::SerializableResource.new(
      object.pending_users, each_serializer: ::UserSerializer
    ).as_json
  end
end
