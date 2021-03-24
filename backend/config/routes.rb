Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }

  resources :brands, only: [:index] do
    collection do
      post :register
    end
  end
end
