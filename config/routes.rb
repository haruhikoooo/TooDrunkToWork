Rails.application.routes.draw do
  devise_for :users
  root "drinks#index"

  resources :users, only: [:edit, :update]
end
