class Api::ProblemsController < ApplicationController
  before_action :authenticate_user!, only: [:current_user_get]

  def current_user_get
    render json: current_user
  end

  def users
    render json: User.all
  end

  def users_problems
    render json: User.find_by_sql("
      SELECT email, question, answer FROM users
      INNER JOIN problems ON users.id = problems.user_id
      ORDER BY users.created_at desc
    ")
  end

  # find a user with a given id
  # User.find(2)
  # User.where(email:  "test1@t.com")

  # get problems for a given user
  # User.find(1).problems

  # get problems for a given user
  # Problem.all

  #give me the the same problem
  # get g
  # User.find(1).problems.find(1)
  # Problem.find(1)

  # update a problem
  # Problem.find(1).update(answer:'2!')

  # create a problem
  # Problem.create(question:'what color is the sky',answer:'blue', user_id:1)
  # User.find(1).problems.create(question:'how', answer:'because')

  # User.find(1).problems.find(8).destroy
end
