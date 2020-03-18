Rails.application.routes.draw do
  devise_for :users
  root "drinks#index"

  resources :users, only: [:edit, :update]
  resources :parties, only: [:new, :create]
end
