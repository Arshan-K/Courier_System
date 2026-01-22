class ApplicationController < ActionController::Base
  before_action :authenticate_request!

  attr_reader :current_user

  private

  def authenticate_request!
    header = request.headers["Authorization"]
    token = header&.split(" ")&.last

    decoded = JwtService.decode(token)

    if decoded
      @current_user = User.find_by(id: decoded[:user_id])
    end

    render_unauthorized unless @current_user
  end

  def render_unauthorized
    render json: { error: "Unauthorized" }, status: :unauthorized
  end
end
