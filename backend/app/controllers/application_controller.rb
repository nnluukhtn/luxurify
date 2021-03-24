class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  respond_to :json

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_error

  private

  def render_not_found_error
    render_error('Resource(s) specified cannot be found', :not_found)
  end

  def render_error(message, http_status_code)
    render json: { error: message }, status: http_status_code
  end
end
