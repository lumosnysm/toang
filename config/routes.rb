Rails.application.routes.draw do
  root to: "maps#index"

  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  }
  resources :maps
end
