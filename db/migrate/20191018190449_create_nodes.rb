class CreateNodes < ActiveRecord::Migration[5.2]
  def change
    create_table :nodes do |t|
      t.references :user
      t.string :location
      t.float :latitude
      t.float :longitude
    end
  end
end
