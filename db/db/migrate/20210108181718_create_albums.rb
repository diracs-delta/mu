class CreateAlbums < ActiveRecord::Migration[6.1]
  def change
    create_table :albums do |t|
      t.string(:title)
      t.belongs_to(:artist, index: true)

      t.timestamps
    end
  end
end
