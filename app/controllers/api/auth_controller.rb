class Api::AuthController < ApplicationController
    skip_before_action :authorize, only: [:login]
  
    def login
      user = User.find_by(email: params[:email])
      if user&.authenticate(params[:password])
        token = encode_token({ user_id: user.id })
        render json: { user: user.as_json(except: :password_digest), token: token }, status: :ok
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
  
    def me
      render json: @current_user, status: :ok
    end
  end