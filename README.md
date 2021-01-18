# μ

A music database, REST API, and web interface all-in-one.

**NOTE**: μ is currently in its very early initial development. Issues
involving lack of visual feedback on actions may occur. It is advised to
refresh the page if any issues appear off.

μ's current features include:

- Uploading, viewing, and playing songs, albums, or playlists

- Downloading album art

- Search through songs

- Adding songs to playlists

- Standard audio playback features, including shuffle and repeat

## External Dependencies

- [`ruby`](https://ruby-lang.org), latest stable 2.x

- [`rails`](https://rubyonrails.org), latest stable 6.x

- [`ffmpeg`](https://ffmpeg.org) for parsing audio duration on file upload

- [`sqlite`](https://sqlite.org) database

- [`yarn`](https://yarnpkg.com/) package manager

- [`serve`](https://www.npmjs.com/package/serve) to serve compiled web app
(install via `yarn global add serve`)

It is suggested to use [`rvm`](https://rvm.io) to handle the installation of
`ruby` and `rails`, but this is optional.

## Getting Started

From the project root, start the database server:

```
cd db
bundle install
RAILS_ENV=production rails db:create db:migrate db:seed
RAILS_ENV=production rails server
```

This should start the database on port 3000. Currently this database is
unencrypted and in development mode, as the API is extremely early in
development and nobody should really be using this for production yet
anyways.

Then, from the project root, start the web app server:

```
cd app
yarn install
yarn build
serve -s build
```

This should start the web app on port 3001.

By default, the database ships with royalty-free music for development and
testing, provided generously by Kevin Macleod. It also initializes a single
playlist named 'favorites'.

Preferably, you should seed the database with some songs of your own, so you
don't have to add all of your songs manually via the rails console or the web
frontend. You can do this by creating new directories with your songs under
the `music/` directory. The sub-directories must preserve the following
structure:

```
music/
|
|-> ARTIST_NAME
    |
    |-> ALBUM_NAME
        |
        |-> [01]SONG_TITLE.(audio_ext)
        |-> [02]SONG_TITLE.(audio_ext)
        |-> ...
        |-> art.(image_ext)
```

where `audio_ext` represents a valid audio file extension (e.g. `mp3`) and
`image_ext` represents a valid image file extension (e.g. `png`). Currently,
mu-db parses for the album number is extremely primitive; it exclusively
reads the second and third characters as the album number. This might be
fixed in the future.

You can look inside the default `music/` directory for an example of a valid
directory layout.

### Seeding music records with `youtube-dl` (optional)

The command-line utility `youtube-dl` provides a nice and easy way of
downloading music directly from YouTube album playlists while automatically
appending the album index to each song. This can be used to easily seed music
into mu-db. Run the following commands in your terminal to get started.

```
$ mkdir [ARTIST]
$ mkdir [ARTIST]/[ALBUM]
$ cd [ARTIST]/[ALBUM]
$ youtube-dl -o "[%(playlist_index)s]%(title)s.%(ext)s" -x [ALBUM_PLAYLIST_URL]
```

Full-resolution album art can be sourced from the [album art exchange](https://albumartexchange.com).

*Note*: I do not condone, endorse, or encourage copyright infringement. Please
support the artists you enjoy music from. This command should be used
exclusively for testing purposes or for easily downloading music you have
already purchased.

## License

All source code is licensed under the MIT license. See LICENSE for more information.

All music shipped with source code (under `music/Kevin Macleod/`) is by [Kevin
Macleod](https://incompetech.com), licensed under
[CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)).
