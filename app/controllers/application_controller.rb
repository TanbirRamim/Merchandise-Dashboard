class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  before_action :authorize

  def encode_token(payload)
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end

  def auth_header
    request.headers["Authorization"]
  end

  def decoded_token
    if auth_header
      token = auth_header.split(" ")[1]
      begin
        JWT.decode(token, Rails.application.credentials.secret_key_base)
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def current_user
    @current_user
  end

  def logged_in?
    !!current_user
  end

  def authorize
    if decoded_token
      user_id = decoded_token[0]["user_id"]
      @current_user = User.find_by(id: user_id)
    end
    
    render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  end

  def decode_token(token)
    JWT.decode(token, Rails.application.credentials.secret_key_base)[0]
  rescue JWT::DecodeError
    nil
  end
end
