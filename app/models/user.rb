class User < ApplicationRecord
    has_secure_password
    has_many :orders
  
    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
    validates :role, presence: true, inclusion: { in: %w[admin user] }
  end