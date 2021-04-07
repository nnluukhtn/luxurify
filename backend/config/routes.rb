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
      get 'watch/reference_number/:reference_number', to: 'watch_signals#watch_by_reference_number'
    end
  end

  resources :watches, only: [:index, :create]

  ### Admin
  devise_for :admins, defaults: { format: :json }

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
