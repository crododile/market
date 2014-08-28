Market::Application.routes.draw do
  devise_for :farmers
  root to: "product_types#index"

  resources :product_types, :defaults => {format: :json} do
    get '/farmers', to: 'product_types#farmersIndex'
    get '/markets', to: 'product_types#marketsIndex'
  end

  resources :product_manifests, :only  => [:create, :destroy, :show]

  get '/current', to: 'farmers#current', :defaults => {format: :json}
  patch '/current', to: 'farmers#update'

  get '/feed', to: 'favorite_farmers#feed'
  

  resources :market_attendances
  
  resources :mrkts, :only => [:index, :show]
  get '/graph', to: 'mrkts#graph'
  get "/count", to: "mrkts#count"

  resources :favorite_farmers, :only => [:create, :destroy]

  resources :farmers, :except => [:create, :index]

end
