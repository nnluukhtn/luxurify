class BrandsController < ApplicationController
  before_action :authenticate_user!

  def register
    brand = Brand.find_by(name: register_params[:name])

    if brand
      brand.pending_users << current_user unless brand.pending_users.exists?(current_user)
    else
      ActiveRecord::Base.transaction do
        brand = Brand.create!(register_params)
        brand.pending_users << current_user
      end
    end

    head :ok
  end

  private

  def register_params
    params.require(:brand).permit(
      :name, :category, :bir_2303_certification, :certificate_of_registration
    )
  end
end
