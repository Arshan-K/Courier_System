class Api::V1::CouriersController < ApplicationController
    before_action :authenticate_request!, except: [:pdf]
  def index
    couriers = current_user.couriers
      .includes(
        :sender,
        :receiver,
        :sender_address,
        :receiver_address,
        :courier_items
      )
      .order(created_at: :desc)

    render json: couriers, include: :courier_items
  end

  def show
    courier = current_user.couriers
      .includes(:sender, :receiver, :courier_items)
      .find_by!(courier_number: params[:courier_number])

    render json: courier.as_json(
      include: {
        sender: { include: :addresses },
        receiver: { include: :addresses },
        courier_items: {}
      }
    )
  end

  def pdf
    @courier = Courier.includes(
      :sender,
      :receiver,
      :sender_address,
      :receiver_address,
      :courier_items
    ).find_by!(courier_number: params[:courier_number])

    html = render_to_string(
      template: "api/v1/couriers/pdf",
      layout: false,
      formats: [:html],
      locals: { courier: @courier }
    )

    pdf = Grover.new(html, format: "A4", print_background: true).to_pdf

    send_data pdf,
      filename: "Courier-#{@courier.courier_number}.pdf",
      type: "application/pdf",
      disposition: "inline"
  end

  def create
    ActiveRecord::Base.transaction do
      sender, sender_address = find_or_create_client(params[:sender])
      receiver, receiver_address = find_or_create_client(params[:receiver])

      courier = current_user.couriers.create!(
        sender: sender,
        receiver: receiver,
        sender_address: sender_address,
        receiver_address: receiver_address,
        payment_mode: params[:payment_mode]
      )

      params[:courier_items].each do |item|
        courier.courier_items.create!(
          description: item[:description],
          weight_kg: item[:quantity],
          bhada: item[:bhada],
          hamali: item[:hamali],
          bilti_charge: item[:bilti_charge]
        )
      end

      update_total_amount(courier)

      render json: courier, status: :created
    end
  end

  private

  def courier_params
    params.require(:courier).permit(
      :sender_id,
      :sender_address_id,
      :receiver_id,
      :receiver_address_id,
      :payment_mode,
      courier_items_attributes: [
        :description,
        :weight_kg,
        :bhada,
        :hamali,
        :bilti_charge
      ]
    )
  end

  def update_total_amount(courier)
    total = courier.courier_items.sum do |item|
      item.bhada.to_f + item.hamali.to_f + item.bilti_charge.to_f
    end

    courier.update!(total_amount: total)
  end

  def find_or_create_client(data)
    client = current_user.clients.find_or_create_by!(
      name: data[:name],
      phone: data[:phone]
    )
    client.email = data[:email] if data[:email].present?
    address = client.addresses.find_or_create_by!(
      address: data.dig(:address, :line1)
    )

    [client, address]
  end
end
