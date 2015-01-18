class AddUniqueConstraintToUrlToApp < ActiveRecord::Migration
  def change
    add_index :apps, :url, :unique => true
  end
end
