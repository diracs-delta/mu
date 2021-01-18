class PlaylistEntriesController < ApplicationController
  def index
    params.require(:playlist_id)
    render(json: PlaylistEntry.where({ playlist_id: params[:playlist_id] }))
  end

  def create
    params.require([:song_id, :playlist_id])
    max = PlaylistEntry.where({ playlist_id: params[:playlist_id] }).maximum(:index)
    if (max.nil?)
      max = 0
    end
    PlaylistEntry.create(
      song_id: params[:song_id],
      playlist_id: params[:playlist_id],
      index: max + 1
    )
  end

  def destroy
    params.require(:id)
    PlaylistEntry.find(params[:id]).destroy
  end
end
