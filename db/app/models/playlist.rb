class Playlist < ApplicationRecord
  has_many(:entries, class_name: 'PlaylistEntry')
  has_many :songs, through: :entries
end
