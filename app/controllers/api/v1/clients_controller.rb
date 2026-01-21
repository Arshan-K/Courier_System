class Api::V1::ClientsController < ApplicationController
    before_action :authenticate_request!
  def search
    clients = current_user.clients.includes(:addresses)

    if params[:q].present?
      clients = clients.where("name ILIKE ?", "%#{params[:q]}%")
    end

    render json: clients.select(:id, :name, :phone, :email), include: :addresses
  end

  def show
    client = current_user.clients.find(params[:id])
    render json: client, include: :addresses
  end

  def create
    client = current_user.clients.create!(client_params)
    render json: client, status: :created
  end

  private

  def client_params
    params.require(:client).permit(:name, :phone)
  end
end
