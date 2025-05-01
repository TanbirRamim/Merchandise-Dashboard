#!/usr/bin/env bash
# exit on error
set -o errexit

# Start Puma server
bundle exec puma -C config/puma.rb 