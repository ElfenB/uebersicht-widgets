#!/usr/bin/osascript

set spotifyApp to "Spotify"
set musicApp to "Music"
set vlcApp to "VLC"

set applicationName to ""
set state to "stopped"
set trackname to ""
set artistname to ""
set trackduration to 0
set playerposition to 0
set albumArt to ""
set output to ""

# Spotify
if application spotifyApp is running then
  tell application "Spotify"
    set applicationName to spotifyApp

    if the player state is playing then
      set state to "playing"
      set trackname to "" & the name of current track
      set artistname to "" & the artist of current track
      set trackduration to the (duration of current track) / 1000
      set playerposition to the player position
      set albumArt to "" & the artwork url of current track
    end if
  end tell
end if

# iTunes
if application musicApp is running then
  tell application "Music"
    set applicationName to musicApp
    if the player state is playing then
      set state to "playing"
      set trackname to "" & the name of current track
      set artistname to "" & the artist of current track
      set trackduration to the (duration of current track)
      set playerposition to the player position
    end if
  end tell
end if

log state
if state is "playing" then
  log applicationName
  log trackname
  log artistname
  log playerposition
  log trackduration
  log albumArt
end if

# return output
