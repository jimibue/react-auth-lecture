class Api::CatsController < ApplicationController
  # before_action :authenticate_user!,
  before_action :authenticate_user!, only: [:index, :update]

  # get /api/cat - returns logged in users cats minus the cats
  # that user liked
  def index
    render json: User.random_cat(current_user.liked_cats)
  end

  def update
    current_user.liked_cats << params[:id].to_i
    current_user.save
  end

  def my_cats
    render json: User.liked(current_user.liked_cats)
  end

  def all_posts
    render json: Post.all
  end

  def my_posts
    render json: current_user.posts.all
  end

  def all_users
    render json: User.all
  end

  def get_current_user
    render json: current_user
  end

  def users_and_posts
    render json: User.find_by_sql("
      SELECT email, title FROM users
      INNER JOIN posts ON users.id = posts.user_id
      ORDER BY users.created_at desc
    ")
  end
end
