Rails.application.routes.draw do
  root to: "maps#index"

  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  }
  resources :maps
  get 'hello_world', to: 'hello_world#index'
  get "nodes_nearby_data", to: "maps_controller#nodes_nearby_data"
end
