Rails.application.routes.draw do
  devise_for :users
  resources :maps
  get 'hello_world', to: 'hello_world#index'
end
