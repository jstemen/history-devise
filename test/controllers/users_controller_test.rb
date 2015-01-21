require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  include Devise::TestHelpers

  test "should get update" do
    sign_in users(:bob)
    titles = App.all.collect{|a| a.title}.sample(2)
    post :update, {user: {apps: titles }}
    bob = User.all.sample
    assert_equal bob.apps.collect{|a| a.title}, titles
    assert_response :success
  end

end
