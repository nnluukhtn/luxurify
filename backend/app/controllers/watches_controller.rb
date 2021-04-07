class WatchesController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.watches
  end

  def create
    watch = current_user.watches.create!(watch_params)

    pin_response = pin_file_to_ipfs
    if pin_response && pin_response.success?
      watch.update!(ipfs_data: pin_response.body)
    end

    render json: watch
  end

  private

  def watch_params
    params.require(:watch).permit(
      :name, :reference_number, :model, :power_reserve,
      :case_diameter, :water_resistance_atm, :brand_name,
      :price_type, :price_unit, :price_fixed,
      :inner_image, :image
    )
  end

  def pin_file_to_ipfs
    return unless watch_params[:image]

    watch_image_filename = "#{watch_params[:name]}#{File.extname(watch_params[:image])}"
    payload = {
      pinataMetadata: {
        name: watch_image_filename,
        keyvalues: watch_params.except(:image, :inner_image).to_h
      }
    }
    payload[:file] = Faraday::FilePart.new(watch_params[:image].path, watch_params[:image].content_type)

    pinata_connection.post('pinning/pinFileToIPFS', payload)
  end

  def pinata_connection
    @pinata_connection ||= Faraday.new(
      url: ENV['PINATA_API']
      ) do |conn|
      conn.options.timeout = 10
      conn.response :logger, nil, { headers: true, bodies: true, log_level: :info }
      conn.request :multipart
      conn.headers['Accept'] = 'application/json'
      conn.headers['Authorization'] = "Bearer #{ENV['PINATA_AUTHORIZATION']}"
      conn.adapter :patron
    end
  end
end
