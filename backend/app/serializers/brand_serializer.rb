# == Schema Information
#
# Table name: brands
#
#  id         :bigint           not null, primary key
#  category   :string
#  name       :string
#  status     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_brands_on_category  (category)
#  index_brands_on_name      (name)
#  index_brands_on_status    (status)
#

class BrandSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :status, :created_at
  attributes :bir_2303_certification_url, :certificate_of_registration_url

  def bir_2303_certification_url
    # object.bir_2303_certification&.url
    bir_2303_certification = object.bir_2303_certification
    return unless bir_2303_certification

    Rails.application.routes.url_helpers.url_for(bir_2303_certification)
  end

  def certificate_of_registration_url
    # object.certificate_of_registration&.url
    certificate_of_registration = object.certificate_of_registration
    return unless certificate_of_registration

    Rails.application.routes.url_helpers.url_for(certificate_of_registration)
  end
end
