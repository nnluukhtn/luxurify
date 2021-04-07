class CreateWatches < ActiveRecord::Migration[6.1]
  def change
    create_table :watches do |t|
      t.string :name, index: true
      t.string :reference_number, index: true
      t.string :model
      t.string :brand_name, index: true

      t.string :price_type
      t.string :price_unit
      t.decimal :price_fixed

      t.jsonb :ipfs_data

      t.bigint :brand_id, index: true
      t.bigint :creator_id, index: true

      t.timestamps
    end
  end
end
