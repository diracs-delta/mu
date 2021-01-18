class CreatePlaylistEntries < ActiveRecord::Migration[6.1]
  def change
    create_table :playlist_entries do |t|
      t.belongs_to :song, null: false, foreign_key: true
      t.belongs_to :playlist, null: false, foreign_key: true
      t.integer :index

      t.timestamps
    end
  end
end
