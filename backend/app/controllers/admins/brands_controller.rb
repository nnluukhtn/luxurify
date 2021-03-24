module Admins
  class BrandsController < ApplicationController
    before_action :authenticate_admin!
    before_action :find_brand_user, only: [:approve, :reject]

    def pending
      render json: {
        data: ActiveModelSerializers::SerializableResource.new(
          BrandUser.pending, each_serializer: ::BrandUserSerializer
        ).as_json
      }
    end

    def approve
      ActiveRecord::Base.transaction do
        @brand_user.approve!
        @brand_user.brand.approve!
      end

      render json: @brand_user
    end

    def reject
      ActiveRecord::Base.transaction do
        @brand_user.reject!
        @brand_user.brand.reject!
      end

      render json: @brand_user
    end

    private

    def find_brand_user
      @brand_user = BrandUser.find params[:id]
    end
  end
end
