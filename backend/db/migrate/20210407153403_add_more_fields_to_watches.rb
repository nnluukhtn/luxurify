class AddMoreFieldsToWatches < ActiveRecord::Migration[6.1]
  def change
    remove_column :watches, :ipfs_data, :jsonb
    add_column :watches, :power_reserve, :integer
    add_column :watches, :case_diameter, :integer
    add_column :watches, :water_resistance_atm, :integer
    add_column :watches, :movement_name, :string
    add_column :watches, :bracelet_color_name, :string
    add_column :watches, :dial_color_name, :string
    add_column :watches, :gender_name, :string
    add_column :watches, :buckle_name, :string
    add_column :watches, :glass_name, :string
    add_column :watches, :case_material_name, :string
    add_column :watches, :bracelet_material_name, :string
    add_column :watches, :bucket_material_name, :string
    add_column :watches, :ipfs_hash, :string
  end
end
