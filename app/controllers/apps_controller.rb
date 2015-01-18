class AppsController < ApplicationController
  def index
    apps = App.all

    #{ 'name': 'Hulu', 'urls': [ 'http://static.huluim.com/system/hulu_0cd8f497_1.css' ] },
    conv_apps = apps.collect{|app|
      {name: app.title, urls: [app.url]}
    }
    render json: conv_apps
  end
end
