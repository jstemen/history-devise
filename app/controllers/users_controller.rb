class UsersController < ApplicationController
  def update
    user = current_user
    user.apps_by_name = user_params.to_h
    render json: user
  end

  def user_params
    my_params = params.require(:user).require(:apps).permit!
    my_params
  end
end
