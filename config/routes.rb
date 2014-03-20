Market::Application.routes.draw do
  root to: "product_types#index"

  resources :product_types, :defaults => {format: :json} do
    get '/farmers', to: 'product_types#farmersIndex'
    get '/shoppers', to: 'product_types#shoppersIndex'
  end

  resources :farmers
  resources :shoppers

end
