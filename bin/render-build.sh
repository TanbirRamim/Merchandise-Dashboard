#!/usr/bin/env bash
# exit on error
set -o errexit

# Unfreeze bundler
bundle config set frozen false

# Install dependencies
bundle install

# Create necessary directories
mkdir -p tmp/pids
mkdir -p tmp/sockets
mkdir -p public/assets
mkdir -p public/packs
mkdir -p public/packs-test
mkdir -p node_modules

# Create asset directories
mkdir -p app/assets/images
mkdir -p app/assets/javascripts
mkdir -p app/assets/stylesheets
mkdir -p app/assets/config

# Ensure database URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set"
  exit 1
fi

# Run migrations and seed data
DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rails db:migrate
DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rails db:seed

# Precompile assets if the task exists
if bundle exec rails -T | grep -q "assets:precompile"; then
  bundle exec rails assets:precompile
  bundle exec rails assets:clean
fi 