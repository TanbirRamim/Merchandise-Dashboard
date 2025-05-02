class User < ApplicationRecord
    has_secure_password
    has_many :orders
    has_many :order_items, through: :orders

    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :name, presence: true
    validates :role, presence: true, inclusion: { in: %w[admin user manager] }
    validates :password, presence: true, length: { minimum: 6 }, if: :password_required?

    def admin?
        role == "admin"
    end

    private

    def password_required?
        new_record? || password.present?
    end
end
