Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :tickets
  resources :accounts
  resources :contacts
  resources :histories
  resources :comments
  resources :blogs
  resources :users

  post '/tickets', to: 'tickets#index'
  post '/tickets/:ticketid', to: 'tickets#show'

  post '/authenticateUser', to: 'users#authenticateUser';
  delete '/logout', to: 'users#logout';
  post '/user', to: 'users#create';

  post '/search/tickets', to: 'tickets#search'
  get '/search/ticket/account/:accountid', to: 'tickets#getAccountTickets'

  get '/getAccountNames', to: 'accounts#getAccountNames'
  post '/search/accounts', to: 'accounts#search'
  get '/getContactNames', to: 'contacts#getContactNames'
  post '/search/contacts', to: 'contacts#search'
  post '/search/histories', to: 'histories#search'

  post '/search/comments', to: 'comments#search'

  get '/search/comments/entity', to: 'comments#entityComment'

  post '/search/blogs', to: 'blogs#search'
end
