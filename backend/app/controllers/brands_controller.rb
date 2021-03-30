class BrandsController < ApplicationController
  before_action :authenticate_user!

  def register
    brand = Brand.find_by(name: register_params[:name])

    if brand
      unless brand.pending_users.exists?(id: current_user.id)
        ActiveRecord::Base.transaction do
          brand.bir_2303_certification.attach(params[:bir_2303_certification]) if params[:bir_2303_certification]
          brand.certificate_of_registration.attach(params[:certificate_of_registration]) if params[:certificate_of_registration]
          brand.pending_users << current_user
        end
      end
    else
      ActiveRecord::Base.transaction do
        brand = Brand.create!(register_params)
        brand.bir_2303_certification.attach(params[:bir_2303_certification]) if params[:bir_2303_certification]
        brand.certificate_of_registration.attach(params[:certificate_of_registration]) if params[:certificate_of_registration]
        brand.pending_users << current_user
      end
    end

    render json: brand
  end

  def index
    render json: {
      active_brands: ActiveModelSerializers::SerializableResource.new(
        current_user.active_brands, each_serializer: ::BrandSerializer
      ).as_json,
      pending_brands: ActiveModelSerializers::SerializableResource.new(
        current_user.pending_brands, each_serializer: ::BrandSerializer
      ).as_json,
      inactive_brands: ActiveModelSerializers::SerializableResource.new(
        current_user.inactive_brands, each_serializer: ::BrandSerializer
      ).as_json
    }
  end

  private

  def register_params
    params.require(:brand).permit(
      :name, :category, :bir_2303_certification, :certificate_of_registration
    )
  end
end
