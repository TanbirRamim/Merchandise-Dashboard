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

# Precompile assets if the task exists
if bundle exec rails -T | grep -q "assets:precompile"; then
  bundle exec rails assets:precompile
  bundle exec rails assets:clean
fi 