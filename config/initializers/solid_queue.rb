# Configure Solid Queue
Rails.application.config.solid_queue.configure do |config|
  config.concurrency = ENV.fetch("SOLID_QUEUE_CONCURRENCY", 5).to_i
  config.polling_interval = ENV.fetch("SOLID_QUEUE_POLLING_INTERVAL", 1).to_i
  config.dispatcher_concurrency = ENV.fetch("SOLID_QUEUE_DISPATCHER_CONCURRENCY", 1).to_i
end 