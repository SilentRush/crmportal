Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :tickets
  resources :accounts

  get '/search/tickets/:query', to: 'tickets#search'
  get '/search/tickets/account/:accountid', to: 'tickets#getAccountTickets'
end
