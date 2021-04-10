class BrandsController < ApplicationController
  before_action :authenticate_user!

  def register
    brand = Brand.find_by(name: register_params[:name])

    if brand
      brand.pending_users << current_user unless brand.pending_users.exists?(id: current_user.id)
    else
      ActiveRecord::Base.transaction do
        brand = Brand.create!(register_params.except(:bir_2303_file, :certificate_file))
        brand.pending_users << current_user
        brand.bir_2303_certification.attach(register_params[:bir_2303_file]) if register_params[:bir_2303_file]
        brand.certificate_of_registration.attach(register_params[:certificate_file]) if register_params[:certificate_file]
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
      :name, :category, :bir_2303_file, :certificate_file
    )
  end
end
