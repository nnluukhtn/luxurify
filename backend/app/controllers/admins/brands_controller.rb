module Admins
  class BrandsController < ApplicationController
    before_action :authenticate_admin!

    def pending
      render json: {
        data: ActiveModelSerializers::SerializableResource.new(
          Brand.pending, each_serializer: ::PendingBrandSerializer
        ).as_json
      }
    end
  end
end
