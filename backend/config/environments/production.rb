# Don't care if the mailer can't send.
config.action_mailer.raise_delivery_errors = false

config.action_mailer.perform_caching = false

# Configure default URL options for the Devise mailer in production
config.action_mailer.default_url_options = { 
  host: ENV['BACKEND_URL'] || 'https://merchandise-dashboard.onrender.com',
  protocol: 'https'
}

# Enable serving of static files from the `/public` folder by default since
# Apache or NGINX already handles this.
config.public_file_server.enabled = ENV['RAILS_SERVE_STATIC_FILES'].present? 