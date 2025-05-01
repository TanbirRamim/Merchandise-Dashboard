class User < ApplicationRecord
    has_secure_password
    has_many :orders
    has_many :order_items, through: :orders

    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
    validates :role, presence: true, inclusion: { in: %w[admin user manager] }

    def admin?
        role == "admin"
    end
end
