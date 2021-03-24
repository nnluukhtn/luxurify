class CreateBrands < ActiveRecord::Migration[6.1]
  def change
    create_table :brands do |t|
      t.string :name, index: true
      t.string :category, index: true
      t.string :status, index: true

      t.timestamps
    end
  end
end
