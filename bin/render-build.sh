#!/usr/bin/env bash
# exit on error
set -o errexit

# Unfreeze bundler to allow Gemfile.lock updates
bundle config set frozen false

# Install dependencies
bundle install

# Create database if it doesn't exist
bundle exec rails db:create

# Run database migrations
bundle exec rails db:migrate

# Seed the database
bundle exec rails db:seed

# Create necessary asset directories if they don't exist
mkdir -p app/assets/javascripts
mkdir -p app/assets/stylesheets
mkdir -p app/assets/images
mkdir -p app/assets/config

# Precompile assets
bundle exec rails assets:precompile
bundle exec rails assets:clean 