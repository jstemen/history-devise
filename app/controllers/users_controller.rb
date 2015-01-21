class UsersController < ApplicationController
  def update
    user = current_user
    user.apps_by_name = user_params[:apps]
    render json: user
  end

  private
  def user_params
    my_params = params.require(:user).permit(:apps => [])
    my_params
  end
end
