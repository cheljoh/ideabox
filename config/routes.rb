Rails.application.routes.draw do

  root to: 'home#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :ideas, only: [:index, :create, :show, :destroy, :update]
    end
  end
end
