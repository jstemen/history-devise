require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  include Devise::TestHelpers
  test "should get home with signed in" do
    sign_in users(:bob)
    get :home
    assert_response :success
  end

  test "should not get home when not signed in" do
    get :home
    assert_response 302
  end

end
