# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2026_01_21_140305) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.bigint "client_id", null: false
    t.string "label"
    t.text "address"
    t.string "pincode"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_addresses_on_client_id"
    t.index ["pincode"], name: "index_addresses_on_pincode"
  end

  create_table "clients", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
    t.index ["user_id"], name: "index_clients_on_user_id"
  end

  create_table "courier_items", force: :cascade do |t|
    t.bigint "courier_id", null: false
    t.string "description"
    t.decimal "weight_kg"
    t.decimal "bhada"
    t.decimal "hamali"
    t.decimal "bilti_charge"
    t.decimal "total"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["courier_id"], name: "index_courier_items_on_courier_id"
  end

  create_table "couriers", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "courier_number", null: false
    t.bigint "sender_id", null: false
    t.bigint "receiver_id", null: false
    t.bigint "sender_address_id", null: false
    t.bigint "receiver_address_id", null: false
    t.integer "status", default: 0
    t.integer "payment_mode"
    t.integer "payment_status", default: 0
    t.decimal "total_amount", precision: 10, scale: 2
    t.datetime "delivered_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["courier_number"], name: "index_couriers_on_courier_number", unique: true
    t.index ["receiver_address_id"], name: "index_couriers_on_receiver_address_id"
    t.index ["receiver_id"], name: "index_couriers_on_receiver_id"
    t.index ["sender_address_id"], name: "index_couriers_on_sender_address_id"
    t.index ["sender_id"], name: "index_couriers_on_sender_id"
    t.index ["user_id"], name: "index_couriers_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "addresses", "clients"
  add_foreign_key "clients", "users"
  add_foreign_key "courier_items", "couriers"
  add_foreign_key "couriers", "addresses", column: "receiver_address_id"
  add_foreign_key "couriers", "addresses", column: "sender_address_id"
  add_foreign_key "couriers", "clients", column: "receiver_id"
  add_foreign_key "couriers", "clients", column: "sender_id"
  add_foreign_key "couriers", "users"
end
