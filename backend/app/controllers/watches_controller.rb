class WatchesController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.watches
  end

  def create
    watch = current_user.watches.create!(watch_params.except(:image, :inner_image))
    watch.image.attach(watch_params[:image]) if watch_params[:image]
    watch.inner_image.attach(watch_params[:inner_image]) if watch_params[:inner_image]

    pin_file_to_ipfs(watch)

    render json: watch
  end

  private

  def watch_params
    params.require(:watch).permit(
      :name, :reference_number, :model, :power_reserve,
      :case_diameter, :water_resistance_atm, :movement_name,
      :bracelet_color_name, :dial_color_name, :gender_name,
      :buckle_name, :glass_name, :brand_name, :case_material_name,
      :bracelet_material_name, :bucket_material_name, :price_type, :price_unit, :price_fixed,
      :inner_image, :image
    )
  end

  def pin_file_to_ipfs(watch)
    return unless watch_params[:image]

    watch_image_filename = "#{watch_params[:name]}#{File.extname(watch_params[:image])}"
    image_payload = {
      pinataMetadata: {
        name: watch_image_filename
      }
    }
    image_payload[:file] = Faraday::FilePart.new(watch_params[:image].path, watch_params[:image].content_type)

    image_resp = pinata_connection.post('pinning/pinFileToIPFS', image_payload)

    return unless image_resp.success?

    image_resp_body = JSON.parse(image_resp.body)
    image_ipfs_url = "#{ENV['PINATA_GATEWAY_API']}/#{image_resp_body['IpfsHash']}"

    json_payload = {
      pinataMetadata: {
        name: watch_params[:name]
      },
      pinataContent: {
        name: watch_params[:name],
        description: watch_params[:name],
        image: image_ipfs_url,
        attributes: [
          {
            trait_type: "Reference Number",
            value: watch_params[:reference_number]
          },
          {
            trait_type: "Model",
            value: watch_params[:model]
          },
          {
            trait_type: "Power Reserve",
            value: watch_params[:power_reserve]
          },
          {
            trait_type: "Case Diameter",
            value: watch_params[:case_diameter]
          },
          {
            trait_type: "Water Resistance ATM",
            value: watch_params[:water_resistance_atm]
          },
          {
            trait_type: "Movement Name",
            value: watch_params[:movement_name]
          },
          {
            trait_type: "Bracelet Color Name",
            value: watch_params[:bracelet_color_name]
          },
          {
            trait_type: "Dial Color Name",
            value: watch_params[:dial_color_name]
          },
          {
            trait_type: "Gender Name",
            value: watch_params[:gender_name]
          },
          {
            trait_type: "Buckle Name",
            value: watch_params[:buckle_name]
          },
          {
            trait_type: "Glass Name",
            value: watch_params[:glass_name]
          },
          {
            trait_type: "Brand Name",
            value: watch_params[:brand_name]
          },
          {
            trait_type: "Case Material Name",
            value: watch_params[:case_material_name]
          },
          {
            trait_type: "Bracelet Material Name",
            value: watch_params[:bracelet_material_name]
          }
        ]
      }
    }

    json_resp = pinata_connection.post('pinning/pinJSONToIPFS', json_payload)

    return unless json_resp.success?

    json_resp_body = JSON.parse(json_resp.body)
    watch.update!(ipfs_hash: json_resp_body['IpfsHash'])
  end

  def pinata_connection
    @pinata_connection ||= Faraday.new(
      url: ENV['PINATA_API']
      ) do |conn|
      conn.options.timeout = 15
      conn.response :logger, nil, { headers: true, bodies: true, log_level: :info }
      conn.request :multipart
      conn.request :json
      conn.headers['Accept'] = 'application/json'
      conn.headers['Authorization'] = "Bearer #{ENV['PINATA_AUTHORIZATION']}"
      conn.adapter :patron
    end
  end
end
