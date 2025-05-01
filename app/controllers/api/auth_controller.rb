module Api
  class AuthController < ApplicationController
    skip_before_action :authorize, only: [ :login ]

    def login
      user = User.find_by(email: params[:email])

      if user&.authenticate(params[:password])
        token = encode_token({ user_id: user.id })
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
