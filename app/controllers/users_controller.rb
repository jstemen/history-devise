class UsersController < ApplicationController
  def update
    #Todo find a less complicated dto structure that still protects against mass assignment
    user = current_user
    hash = {}
    user_params['apps'].each{|array_param|
      name_to_visited = array_param.last.to_hash
      hash[name_to_visited['name']] = name_to_visited['wasVisited']
    }
    user.apps_by_name = hash
    render json: user
  end

  def user_params
    params.require(:user).require(:apps)
    my_params = params.require(:user).permit(:apps => [:name, :wasVisited])
    my_params
  end
end
