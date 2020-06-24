class Api::ProblemsController < ApplicationController
  before_action :authenticate_user!, only: [:current_user_get, :destroy, :create, :update]

  def current_user_get
    render json: current_user
  end

  def users
    render json: User.all
  end

  def users_problems
    # render json: User.joins(:problems)
    render json: User.find_by_sql("
      SELECT problems.id, user_id, email, question, answer FROM users
      INNER JOIN problems ON users.id = problems.user_id
      ORDER BY users.created_at desc
    ")
  end

  def create
    problem = current_user.problems.new(problem_params)
    if problem.save
      render json: problem
    else
      render json: problem.errors
    end
  end

  def update
    problem = current_user.problems.find(params[:id])
    if problem.update(problem_params)
      render json: problem
    else
      render json: problem.errors
    end
  end

  def destroy
    render json: current_user.problems.find(params[:id]).destroy
  end

  def delete_problem
    # why do we want to delete with current_user
    # User.first.problems.destroy(6) #won't work
    # Problem.find(6).destroy() #will work
  end

  private

  def problem_params
    params.require(:problem).permit(:question, :answer)
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
