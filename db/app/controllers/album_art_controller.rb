class AlbumArtController < ApplicationController
  def show
    params.require(:album_id)
    redirect_to url_for Album.find(params[:album_id]).art
  end
end
