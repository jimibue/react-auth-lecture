class CreateProblems < ActiveRecord::Migration[6.0]
  def change
    create_table :problems do |t|
      t.string :question
      t.string :answer
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
