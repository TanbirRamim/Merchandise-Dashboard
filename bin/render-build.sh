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

# Ensure database URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set"
  exit 1
fi

# Create database if it doesn't exist
bundle exec rails db:create || true

# Run migrations
bundle exec rails db:migrate

# Seed the database
bundle exec rails db:seed

# Precompile assets if the task exists
if bundle exec rails -T | grep -q "assets:precompile"; then
  bundle exec rails assets:precompile
  bundle exec rails assets:clean
fi 