module Api
  class AuthController < ApplicationController
    skip_before_action :authenticate_user!, only: [:login, :register]

    def register
      Rails.logger.info "Registration attempt with params: #{params.inspect}"
      
      # Validate required parameters
      unless params[:email].present? && params[:password].present? && params[:name].present?
        return render json: { 
          error: "Missing required fields",
          details: {
            email: "Email is required",
            password: "Password is required",
            name: "Name is required"
          }
        }, status: :unprocessable_entity
      end

      # Check if user already exists
      if User.exists?(email: params[:email])
        return render json: { 
          error: "Email already registered",
          details: { email: "This email is already in use" }
        }, status: :unprocessable_entity
      end

      user = User.new(
        email: params[:email],
        password: params[:password],
        name: params[:name],
        role: 'user' # Default role for new users
      )

      if user.save
        Rails.logger.info "User successfully created: #{user.email}"
        token = JWT.encode({ user_id: user.id }, Rails.application.secrets.secret_key_base)
        render json: { 
          token: token, 
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        }
      else
        Rails.logger.error "User creation failed: #{user.errors.full_messages}"
        render json: { 
          error: user.errors.full_messages.join(', '),
          details: user.errors.details
        }, status: :unprocessable_entity
      end
    rescue => e
      Rails.logger.error "Registration error: #{e.message}\n#{e.backtrace.join("\n")}"
      render json: { error: "Registration failed: #{e.message}" }, status: :internal_server_error
    end

    def login
      unless params[:email].present? && params[:password].present?
        return render json: { error: "Email and password are required" }, status: :unprocessable_entity
      end

      user = User.find_by(email: params[:email])

      if user&.authenticate(params[:password])
        token = JWT.encode({ user_id: user.id }, Rails.application.secrets.secret_key_base)
        render json: { 
          token: token, 
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        }
      else
        render json: { error: "Invalid email or password" }, status: :unauthorized
      end
    end

    def me
      if current_user
        render json: {
          id: current_user.id,
          email: current_user.email,
          name: current_user.name,
          role: current_user.role
        }
      else
        render json: { error: "Not authenticated" }, status: :unauthorized
      end
    end
  end
end
