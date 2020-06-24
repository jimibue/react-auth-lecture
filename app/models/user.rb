# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  serialize :liked_cats, Array
  has_many :posts

  # setup follower/followees
  has_many :followed_users, foreign_key: :follower_id, class_name: "Follow"
  has_many :followees, through: :followed_users

  has_many :following_users, foreign_key: :followee_id, class_name: "Follow"
  has_many :followers, through: :following_users

  # setup friendships
  has_and_belongs_to_many :friendships,
                          class_name: "User",
                          join_table: :friendships,
                          foreign_key: :user_id,
                          association_foreign_key: :friend_user_id

  ## problem
  has_many :problems

  def self.random_cat(ids)
    ids = ids.empty? ? [0] : ids
    Cat.where("id NOT in (?)", ids).order("RANDOM()")
  end

  def self.liked(ids)
    ids = ids.empty? ? [0] : ids
    Cat.where("id In (?)", ids)
  end
end
