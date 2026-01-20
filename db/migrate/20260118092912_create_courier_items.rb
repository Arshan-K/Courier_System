class CreateCourierItems < ActiveRecord::Migration[8.0]
  def change
    create_table :courier_items do |t|
      t.references :courier, null: false, foreign_key: true
      t.string :description
      t.decimal :weight_kg
      t.decimal :bhada
      t.decimal :hamali
      t.decimal :bilti_charge
      t.decimal :total

      t.timestamps
    end
  end
end
