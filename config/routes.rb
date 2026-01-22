Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  namespace :api do
    namespace :v1 do
      post "/login", to: "auth#login"

      get "dashboard", to: "dashboard#index"
      get "couriers/:courier_number", to: "couriers#show"
      get "couriers/:courier_number/pdf", to: "couriers#pdf"

      resources :clients do
        collection do
          get :search
        end
      end
      get "histories", to: "histories#index"
      resources :addresses, only: [:index, :create]
      resources :couriers, only: [:index, :create, :show]
    end
  end
end
