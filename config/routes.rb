Market::Application.routes.draw do


  resources :product_types do
    get '/farmers', to: 'product_type#farmersIndex'
    get '/shoppers', to: 'product_type#shoppersIndex'
  end

  resources :farmers
  resources :shoppers
end
