class AddLikedCatsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :liked_cats, :text
  end
end
