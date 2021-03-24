class BrandSerializer < ActiveModel::Serializer
  attributes :name, :category, :status
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
