require 'audio'

class SongsController < ApplicationController
  def index
    queue = Song.all
    puts(params[:q])
    puts("'%#{params[:q]}%'")
    queue = queue.where('title LIKE ?', "%#{params[:q]}%") unless params[:q].nil?
    queue = queue.where({ album_id: params[:album_id] }) unless params[:album_id].nil?
    queue = queue.merge(Playlist.find(params[:playlist_id]).songs) unless params[:playlist_id].nil?
    render(json: queue)
  end

  def show
    params.require(:id)
    render(json: Song.find(params[:id]))
  end

  def create
    fetch_artist
    fetch_album
    song = Song.create(
      title: song_params[:song_title],
      album: @album,
      album_index: song_params[:album_index],
      duration: Audio.duration_of(song_params[:file].path)
    )
    song.audio.attach(song_params[:file])
  end

  def destroy
    params.require(:id)
    Song.find(params[:id]).destroy
  end

  private def song_params
    # require title and set default values for album and artist
    params.require([:song_title, :file])
    album_title = params[:album_title] || 'Unknown album'
    artist_name = params[:artist_name] || 'Unknown artist'
    album_index = params[:album_index] || 0
    {
      song_title: params[:song_title],
      album_title: album_title,
      artist_name: artist_name,
      album_index: album_index,
      file: params[:file]
    }
  end

  private def fetch_artist
    # create artist if not existing
    artist_query = Artist.where({ name: song_params[:artist_name] })
    if artist_query.empty?
      @artist = Artist.new(name: song_params[:artist_name])
    else
      @artist = artist_query[0]
    end
  end

  private def fetch_album
    # create album if not existing
    album_query = Album.where({ title: song_params[:album_title] })
    if album_query.empty?
      @album = Album.new(title: song_params[:album_title], artist: @artist)
      @artist = Artist.new(name: song_params[:artist_name])
    else
      @album = album_query[0]
    end
  end
end
