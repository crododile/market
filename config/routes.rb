Market::Application.routes.draw do
  devise_for :farmers
  root to: "product_types#index"

  resources :product_types, :defaults => {format: :json} do
    get '/farmers', to: 'product_types#farmersIndex'
  end

  resources :product_manifests, :only  => [:create, :destroy, :show]

  get '/current', to: 'farmers#current', :defaults => {format: :json}
  patch '/current', to: 'farmers#update'

  get '/feed', to: 'favorite_farmers#feed'
  
  resources :mrkts, :only => [:index]

  resources :favorite_farmers, :only => [:create, :destroy]

  resources :farmers, :except => [:create, :index]

end
