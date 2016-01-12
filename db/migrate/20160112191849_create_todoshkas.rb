class CreateTodoshkas < ActiveRecord::Migration
  def change
    create_table :todoshkas do |t|
      t.text :text
      t.boolean :done

      t.timestamps null: false
    end
  end
end
