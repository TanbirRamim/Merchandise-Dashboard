# Configure Solid Cache
Rails.application.config.solid_cache.max_age = ENV.fetch("SOLID_CACHE_MAX_AGE", 1.day).to_i
Rails.application.config.solid_cache.max_size = ENV.fetch("SOLID_CACHE_MAX_SIZE", 100.megabytes).to_i
Rails.application.config.solid_cache.compression_threshold = ENV.fetch("SOLID_CACHE_COMPRESSION_THRESHOLD", 1.kilobyte).to_i 