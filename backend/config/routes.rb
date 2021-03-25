Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }

  resources :brands, only: [:index] do
    collection do
      post :register
    end
  end

  resources :watch_signals, only: [] do
    collection do
      get :brands
    end
  end

  ### Admin
  devise_for :admins

  namespace :admins do
    resources :brands, only: [] do
      collection do
        get :pending
      end

      member do
        post :approve
        post :reject
      end
    end
  end
end
