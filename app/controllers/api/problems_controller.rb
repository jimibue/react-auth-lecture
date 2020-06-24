class Api::ProblemsController < ApplicationController
  def users
    render json: User.all
  end
end
