# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_18_195018) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "air_infos", force: :cascade do |t|
    t.bigint "node_id"
    t.string "location"
    t.integer "ts"
    t.integer "hu"
    t.integer "pr"
    t.integer "tp"
    t.integer "wd"
    t.integer "ws"
    t.integer "aqius"
    t.integer "aqicn"
    t.index ["node_id"], name: "index_air_infos_on_node_id"
  end

  create_table "nodes", force: :cascade do |t|
    t.bigint "user_id"
    t.string "location"
    t.float "latitude"
    t.float "longitude"
    t.integer "aqius"
    t.integer "aqicn"
    t.index ["user_id"], name: "index_nodes_on_user_id"
  end

  create_table "premium_air_infos", force: :cascade do |t|
    t.bigint "air_info_id"
    t.integer "p1_conc"
    t.integer "p1_aqius"
    t.integer "p1_aqicn"
    t.integer "p2_conc"
    t.integer "p2_aqius"
    t.integer "p2_aqicn"
    t.integer "o3_conc"
    t.integer "o3_aqius"
    t.integer "o3_aqicn"
    t.integer "n2_conc"
    t.integer "n2_aqius"
    t.integer "n2_aqicn"
    t.integer "s2_conc"
    t.integer "s2_aqius"
    t.integer "s2_aqicn"
    t.integer "co_conc"
    t.integer "co_aqius"
    t.integer "co_aqicn"
    t.index ["air_info_id"], name: "index_premium_air_infos_on_air_info_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.integer "type_id", default: 0
    t.string "key"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
