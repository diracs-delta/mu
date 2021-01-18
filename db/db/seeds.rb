# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

require 'audio'

Artist.destroy_all
Album.destroy_all
Song.destroy_all

MUSIC_DIR = 'music'

# iterate over artist directories
Dir.each_child(MUSIC_DIR) do |artist_name|
  # find artist dirs, skipping if not a dir
  artist_path = File.join(MUSIC_DIR, artist_name)
  next unless File.directory?(artist_path)
  # create artist record
  artist = Artist.create(name: artist_name)

  # iterate over album directories
  Dir.each_child(artist_path) do |album_name|
    album_path = File.join(artist_path, album_name)
    next unless File.directory?(album_path)
    # create album record
    album = Album.create(title: album_name, artist: artist)

    # iterate over files in album
    Dir.each_child(album_path) do |filename|
      file_path = File.join(album_path, filename)

      # if art file, attach album art and then skip to next file
      if filename.start_with?('art.')
        album.art.attach(io: File.open(file_path), filename: filename)
        next
      end

      # otherwise create new song records, attaching audio
      song_title = File.basename(filename[4..], File.extname(filename))
      album_index = filename[1,2].to_i
      duration = Audio.duration_of(file_path)
      song = Song.create(
        title: song_title,
        album: album,
        album_index: album_index,
        artist: artist,
        duration: duration
      )
      song.audio.attach(io: File.open(file_path), filename: filename)
    end
  end
end

Playlist.create(name: 'favorites')
PlaylistEntry.create(song_id: 1, playlist_id: 1, index: 1)
PlaylistEntry.create(song_id: 2, playlist_id: 1, index: 2)
PlaylistEntry.create(song_id: 3, playlist_id: 1, index: 3)