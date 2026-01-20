class CreateAddresses < ActiveRecord::Migration[8.0]
  def change
    create_table :addresses do |t|
      t.references :client, null: false, foreign_key: true
      t.string :label
      t.text :address
      t.string :pincode

      t.timestamps
    end

    add_index :addresses, :pincode
  end
end
