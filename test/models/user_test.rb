require 'test_helper'

class UserTest < ActiveSupport::TestCase

   test "apps_by_name should set user to app relationships" do
     titles = App.all.collect{|a|a.title}

     bob = users(:bob)
     bob.apps_by_name= titles
     assert_equal bob.apps, App.all.to_a
   end
end
