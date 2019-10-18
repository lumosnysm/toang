class CreateNodes < ActiveRecord::Migration[5.2]
  def change
    create_table :nodes do |t|
      t.references :user
      t.float :x
      t.float :y
    end
  end
end
