# Don't care if the mailer can't send.
config.action_mailer.raise_delivery_errors = false

config.action_mailer.perform_caching = false

# Configure default URL options for the Devise mailer in development
config.action_mailer.default_url_options = { host: 'localhost', port: 3001 }

# Print deprecation notices to the Rails logger.
config.active_support.deprecation = :log 