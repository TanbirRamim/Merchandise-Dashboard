# Configure Solid Queue
Rails.application.config.solid_queue.workers = ENV.fetch("SOLID_QUEUE_WORKERS", 5).to_i
Rails.application.config.solid_queue.polling_interval = ENV.fetch("SOLID_QUEUE_POLLING_INTERVAL", 1).to_i
Rails.application.config.solid_queue.dispatcher_concurrency = ENV.fetch("SOLID_QUEUE_DISPATCHER_CONCURRENCY", 1).to_i 