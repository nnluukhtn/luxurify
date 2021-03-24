class CreateBrandUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :brand_users do |t|
      t.references :brand, index: true
      t.references :user, index: true
      t.string :status, index: true

      t.timestamps
    end
  end
end
