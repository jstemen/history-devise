class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_and_belongs_to_many :apps

  def apps_by_name=(app_names)
    apps = app_names.collect { |app_name, visited |
    if visited == 'true'
      app = App.find_by_title app_name
      app
    end
    }
    apps.compact!
    self.apps = apps
    self.save
  end
end
