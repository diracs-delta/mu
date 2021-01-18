class AlbumsController < ApplicationController
  def index
    render(json: Album.all)
  end

  def show
    params.require(:id)
    render(json: Album.find(params[:id]))
  end

  def update
    # i have no damn clue why i can't chain require
    # puts params.class
    # puts params.require('id') # <- should return ActionController::Parameters ???
    album = Album.find(params[:id])
    album.title = params[:title]
    album.save
  end

  def destroy
    params.require(:id)
    Album.find(params[:id]).destroy
  end
end
