class Api::V1::AddressesController < ApplicationController
    before_action :authenticate_request!
  def index
    addresses = Address
      .joins(:client)
      .where(clients: { user_id: current_user.id })

    if params[:pincode].present?
      addresses = addresses.where(pincode: params[:pincode])
    end

    if params[:client_id].present?
      addresses = addresses.where(client_id: params[:client_id])
    end

    render json: addresses
  end

  def create
    address = Address.create!(address_params)
    render json: address, status: :created
  end

  private

  def address_params
    params.require(:address)
          .permit(:client_id, :label, :address, :pincode)
  end
end
