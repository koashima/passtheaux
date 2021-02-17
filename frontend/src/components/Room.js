import React, { useEffect, useState } from 'react';
import { Grid, ButtonGroup, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useRoom } from '../hooks/use-room';
import CreateRoom from './CreateRoom';
import MusicPlayer from './MusicPlayer';
const Room = (props) => {
  const {
    setRoomCode,
    votesToSkip,
    setVotesToSkip,
    guestCanPause,
    setGuestCanPause,
    // isHost,
    // setIsHost,
    settings,
    setSettings,
  } = useRoom();
  const [isHost, setIsHost] = useState(false);
  const [song, setSong] = useState({});
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const history = useHistory();
  const roomCode = props.match.params.roomCode;

  const load = useEffect(() => {
    const getRoomDetails = async () => {
      await fetch('/api/get-room' + '?code=' + roomCode)
        .then((response) => {
          if (!response.ok) {
            setRoomCode(null);
            history.push('/');
          }
          return response.json();
        })
        .then((data) => {
          setVotesToSkip(data.votes_to_skip);
          setGuestCanPause(data.guest_can_pause);
          setIsHost(data.is_host);
          if (data.is_host) {
            authenticateSpotify();
          }
        });
    };
    getRoomDetails();
    getCurrentSong();
  }, [isHost]);
  console.log(isHost);

  function authenticateSpotify() {
    fetch('/spotify/is-authenticated')
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        console.log(data.status);
        if (!data.status) {
          fetch('/spotify/get-auth-url')
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  function getCurrentSong() {
    fetch('/spotify/current-song')
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSong(data);
      });
  }
  const handleLeaveRoom = () => {
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('/api/leave-room', reqOptions).then((_response) => {
      setRoomCode(null);
      history.push('/');
    });
  };

  const showSettingsButton = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => setSettings(true)}
      >
        SETTINGS
      </Button>
    );
  };

  if (settings) {
    return <CreateRoom roomCode={roomCode} updateCallback={() => load} />;
  }

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          CODE: {roomCode}
        </Typography>
        <MusicPlayer />
      </Grid>

      <br />
      <ButtonGroup disableElevation color="primary">
        {isHost ? showSettingsButton() : null}
        <Button color="secondary" variant="contained" onClick={handleLeaveRoom}>
          LEAVE
        </Button>
      </ButtonGroup>
    </Grid>
  );
};

export default Room;
