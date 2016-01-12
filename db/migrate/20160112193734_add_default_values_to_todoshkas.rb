class AddDefaultValuesToTodoshkas < ActiveRecord::Migration
  def change
    change_column :todoshkas, :done, :boolean, :default => false
  end
end
