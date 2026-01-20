class CreateCouriers < ActiveRecord::Migration[8.0]
  def change
    create_table :couriers do |t|
      t.references :user, null: false, foreign_key: true

      t.string :courier_number, null: false

      t.references :sender,
                   null: false,
                   foreign_key: { to_table: :clients }

      t.references :receiver,
                   null: false,
                   foreign_key: { to_table: :clients }

      t.references :sender_address,
                   null: false,
                   foreign_key: { to_table: :addresses }

      t.references :receiver_address,
                   null: false,
                   foreign_key: { to_table: :addresses }

      t.integer :status, default: 0
      t.integer :payment_mode
      t.integer :payment_status, default: 0

      t.decimal :total_amount, precision: 10, scale: 2
      t.datetime :delivered_at

      t.timestamps
    end

    add_index :couriers, :courier_number, unique: true
  end
end
