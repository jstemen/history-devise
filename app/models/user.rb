class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_and_belongs_to_many :apps

  def apps_by_name=(app_names)
    new_apps = app_names.collect do |app_name|
      App.find_by_title app_name
    end
    self.apps = new_apps
    save
  end
end
