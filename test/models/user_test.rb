require 'test_helper'

class UserTest < ActiveSupport::TestCase

   test "apps_by_name should set user to app relationships" do
     titles = App.all.collect{|a|a.title}
     hash = {}
     titles.each{|app_title|
       hash[app_title]=true
     }

     bob = users(:bob)
     bob.apps_by_name= hash
     assert bob.apps.size == titles.size
   end
end
