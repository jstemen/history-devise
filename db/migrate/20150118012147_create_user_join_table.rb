class CreateUserJoinTable < ActiveRecord::Migration
  def change
    create_join_table :users, :apps do |t|
      # t.index [:user_id, :app_id]
      t.index [:app_id, :user_id], unique: true
    end
  end
end
