Rails.application.routes.draw do
  resources(:songs) do
    resource(:audio, controller: 'audio')
  end
  resources(:albums) do
    resource(:art, controller: 'album_art')
    resources(:songs)
  end
  resources(:artists)
  resources(:playlists) do
    resources(:entries, controller: 'playlist_entries')
    resources(:songs)
  end
end
