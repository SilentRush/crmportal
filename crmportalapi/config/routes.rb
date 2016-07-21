Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :tickets
  resources :accounts

  post '/search/tickets', to: 'tickets#search'
  get '/search/tickets/account/:accountid', to: 'tickets#getAccountTickets'

  post '/search/accounts', to: 'accounts#search'
end
