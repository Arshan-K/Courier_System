
class Api::V1::DashboardController < ApplicationController
    before_action :authenticate_request!
    
        def index
            couriers = current_user.couriers
            
            render json: {
            total_deliveries: couriers.count,
            pending: couriers.where(status: :pending).count,
            delivered: couriers.where(status: :delivered).count
        }
    end
end
