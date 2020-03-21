Rails.application.routes.draw do
  devise_for :users
  root "parties#index"

  resources :users, only: [:edit, :update]
  resources :parties, only: [:index, :new, :create] do
    resources :drinks, only: [:index, :create]
  end
end
