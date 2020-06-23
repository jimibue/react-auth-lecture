Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :cats, only: [:index, :update]
    get "my_cats", to: "cats#my_cats"
    get "all_posts", to: "cats#all_posts"
    get "my_posts", to: "cats#my_posts"
    get "all_users", to: "cats#all_users"
    get "get_current_user", to: "cats#get_current_user"
    get "users_and_posts", to: "cats#users_and_posts"
  end
end
