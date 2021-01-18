class PlaylistsController < ApplicationController
  def index
    params.permit(:q)
    playlists = Playlist.all
    playlists = playlists.where('name LIKE ?', "%#{params[:q]}%") unless params[:q].nil?
    render(json: playlists)
  end

  def create
    params.require(:name)
    Playlist.create(name: params[:name])
  end

  def update
    playlist = Playlist.find(params[:id])
    playlist.name = params[:name]
    playlist.save
  end
end
