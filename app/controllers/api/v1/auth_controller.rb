class Api::V1::AuthController < ApplicationController
  skip_before_action :authenticate_request!, only: [:login]

  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = JwtService.encode(user_id: user.id)

      render json: {
        token: token,
        user: {
          id: user.id,
          email: user.email
        }
      }
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end
end
