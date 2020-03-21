class CreateDrinks < ActiveRecord::Migration[5.2]
  def change
    create_table :drinks do |t|
      t.string :name,       null: false
      t.integer :amount,    null: false
      t.decimal :content,    null: false, precision: 4, scale: 1
      t.text :comment
      t.references :user,   foreign_key: true
      t.references :party,  foreign_key: true
      t.timestamps
    end
  end
end
