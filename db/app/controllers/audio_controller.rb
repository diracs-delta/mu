class AudioController < ApplicationController
  def show
    params.require(:song_id)
    redirect_to url_for Song.find(params[:song_id]).audio
  end
end
