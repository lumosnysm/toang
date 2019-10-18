class CreateDatas < ActiveRecord::Migration[5.2]
  def change
    create_table :datas do |t|
      t.references :node
      t.string :city
      t.string :country
      t.integer :ts
      t.integer :hu
      t.integer :pr
      t.integer :tp
      t.integer :wd
      t.integer :ws
      t.integer :aqius
      t.integer :aqicn
    end
  end
end
