class AddTitleToApp < ActiveRecord::Migration
  def change
    add_column :apps, :title, :string
  end
end
