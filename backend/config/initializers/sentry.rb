Sentry.init do |config|
  config.breadcrumbs_logger = [:sentry_logger, :active_support_logger]
  # config.enabled_environments = %w[production]
  config.excluded_exceptions += ['ActionController::RoutingError', 'ActiveRecord::RecordNotFound']

  # To activate performance monitoring, set one of these options.
  # We recommend adjusting the value in production:
  config.traces_sample_rate = 0.5
  # or
  config.traces_sampler = lambda do |context|
    true
  end
end
