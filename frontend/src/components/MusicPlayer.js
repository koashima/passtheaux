import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  LinearProgress,
  IconButton,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const MusicPlayer = () => {
  const [song, setSong] = useState({});
  useEffect(() => {
    let interval = setInterval(getCurrentSong, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [song]);

  function getCurrentSong() {
    fetch('/spotify/current-song')
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then(async (data) => {
        await setSong(data);
        console.log(song);
      });
  }

  function pauseSong() {
    const reqOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('/spotify/pause', reqOptions);
  }

  function playSong() {
    const reqOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('/spotify/play', reqOptions);
  }

  function skipSong() {
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('/spotify/skip', reqOptions);
  }

  const songProgress = (song.time / song.duration) * 100;

  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item align="center" xs={4}>
          <img src={song.image_url} height="100%" width="100%" />
        </Grid>
        <Grid item align="center" xs={8}>
          <Typography component="h5" variant="h5">
            {song.title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {song.artist}
          </Typography>
          <>
            <IconButton
              onClick={() => {
                song.is_playing ? pauseSong() : playSong();
              }}
            >
              {song.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={() => skipSong()}>
              <SkipNextIcon />
              <small>
                {song.votes} / {song.votes_required}
              </small>
            </IconButton>
          </>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress} />
    </Card>
  );
};

export default MusicPlayer;
