class CreatePremiumAirInfos < ActiveRecord::Migration[5.2]
  def change
    create_table :premium_air_infos do |t|
      t.references :air_info
      t.integer :p1_conc
      t.integer :p1_aqius
      t.integer :p1_aqicn
      t.integer :p2_conc
      t.integer :p2_aqius
      t.integer :p2_aqicn
      t.integer :o3_conc
      t.integer :o3_aqius
      t.integer :o3_aqicn
      t.integer :n2_conc
      t.integer :n2_aqius
      t.integer :n2_aqicn
      t.integer :s2_conc
      t.integer :s2_aqius
      t.integer :s2_aqicn
      t.integer :co_conc
      t.integer :co_aqius
      t.integer :co_aqicn
    end
  end
end
