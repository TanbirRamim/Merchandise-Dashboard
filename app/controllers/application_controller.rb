class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  before_action :authorize

  def encode_token(payload)
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def auth_header
    request.headers["Authorization"]
  end

  def decoded_token
    if auth_header
      token = auth_header.split(" ")[1]
      begin
        JWT.decode(token, Rails.application.secrets.secret_key_base)
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
    @current_user = User.find_by(id: session[:user_id])
    render json: { errors: [ "Not authorized" ] }, status: :unauthorized unless @current_user
  end

  def decode_token(token)
    JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
  rescue JWT::DecodeError
    nil
  end
end
