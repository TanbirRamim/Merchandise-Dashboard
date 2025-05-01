#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
bundle install

# Precompile assets
bundle exec rails assets:precompile
bundle exec rails assets:clean

# Run database migrations
bundle exec rails db:migrate

# Create database if it doesn't exist
bundle exec rails db:create

# Seed the database
bundle exec rails db:seed 