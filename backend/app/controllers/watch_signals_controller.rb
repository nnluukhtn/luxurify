class WatchSignalsController < ApplicationController
  before_action :authenticate_user!

  def brands
    resp = watch_signals_connection.get('brand/all')

    render json: resp.body, status: resp.status
  end

  def watch_by_reference_number
    resp = watch_signals_connection.get("watch/referencenumber/#{params[:reference_number]}")

    render json: resp.body, status: resp.status
  end

  private

  def watch_signals_connection
    @watch_signals_connection ||= Faraday.new(
      url: ENV['WATCH_SIGNALS_API']
      ) do |conn|
      conn.options.timeout = 15
      conn.response :logger, nil, { headers: true, bodies: true, log_level: :info }
      conn.request :json
      conn.headers['Accept'] = 'application/json'
      conn.headers['Content-Type'] = 'application/json'
      conn.headers['X-API-KEY'] = ENV['WATCH_SIGNALS_API_KEY']
      conn.adapter :patron
    end
  end
end
