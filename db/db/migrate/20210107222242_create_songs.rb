class CreateSongs < ActiveRecord::Migration[6.1]
  def change
    create_table :songs do |t|
      t.string(:title)
      t.belongs_to(:album, index: true)
      t.integer(:album_index)
      t.float(:duration)

      t.timestamps
    end
  end
end
