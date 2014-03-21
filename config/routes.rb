Market::Application.routes.draw do
  devise_for :farmers
  root to: "product_types#index"

  resources :product_types, :defaults => {format: :json} do
    get '/farmers', to: 'product_types#farmersIndex'
    get '/shoppers', to: 'product_types#shoppersIndex'
  end

  resources :product_manifests, :only  => [:create, :destroy, :show]

  get '/current', to: 'farmers#current'
  patch '/current', to: 'farmers#update'

  resources :shoppers

end
