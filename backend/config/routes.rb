Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }

  resources :brands, only: [:index] do
    collection do
      post :register
    end
  end


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
