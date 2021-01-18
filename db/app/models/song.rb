class Song < ApplicationRecord
  belongs_to(:album)
  has_one(:artist, through: :album)
  has_one_attached(:audio)
  has_many(:entries, class_name: 'PlaylistEntry', dependent: :destroy)
  has_many :playlists, through: :playlist_entries
end
