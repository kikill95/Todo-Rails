Rails.application.routes.draw do
  root 'todoshkas#index'
  resource :todoshka
end
