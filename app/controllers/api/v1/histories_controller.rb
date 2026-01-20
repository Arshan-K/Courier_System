class Api::V1::HistoriesController < ApplicationController
#   before_action :set_history, only: [:show, :update, :destroy]
    before_action :authenticate_request!

  # GET /api/v1/histories
  def index
    couriers = current_user.couriers
        .includes(:sender, :receiver, :courier_items)
        .order(created_at: :desc)

    render json: couriers.as_json(
        include: {
        sender: { only: [:name, :phone] },
        receiver: { only: [:name, :phone] },
        courier_items: { only: [:description, :quantity] }
        },
        only: [
        :id,
        :courier_number,
        :status,
        :payment_mode,
        :total_amount,
        :created_at
        ]
    )
    end

  # GET /api/v1/histories/:id
#   def show
#     render json: @history
#   end

#   # POST /api/v1/histories
#   def create
#     @history = History.new(history_params)
#     if @history.save
#       render json: @history, status: :created
#     else
#       render json: @history.errors, status: :unprocessable_entity
#     end
#   end

#   # PATCH/PUT /api/v1/histories/:id
#   def update
#     if @history.update(history_params)
#       render json: @history
#     else
#       render json: @history.errors, status: :unprocessable_entity
#     end
#   end

  # DELETE /api/v1/histories/:id
  def destroy
    @history.destroy
    head :no_content
  end

  private

  def set_history
    @history = History.find(params[:id])
  end

  def history_params
    params.require(:history).permit(:attribute1, :attribute2, :attribute3) # Replace with actual attributes
  end
end