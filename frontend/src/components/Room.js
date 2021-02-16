import React, { useState, useEffect } from 'react';
import { Grid, ButtonGroup, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useRoom } from '../hooks/use-room';
import CreateRoom from './CreateRoom';

const Room = (props) => {
  const {
    setRoomCode,
    votesToSkip,
    setVotesToSkip,
    guestCanPause,
    setGuestCanPause,
    isHost,
    setIsHost,
    settings,
    setSettings,
  } = useRoom();
  const [spotifyAuth, setSpotifyAuth] = useState(false);
  const history = useHistory();
  const roomCode = props.match.params.roomCode;

  const authenticateSpotify = () => {
    fetch('/spotify/is-authenticated')
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuth(data.status);
        console.log(data.status)
        if (!data.status) {
          fetch('/spotify/get-auth-url')
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  };
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
          {
            data.is_host ? authenticateSpotify() : null;
          }
        });
    };
    getRoomDetails();
    // why is isHost's value still false when i just setIstHost to data.is_host, which is definitely true ?
    // console.log(isHost);
  }, []);

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
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          VOTES TO SKIP: {votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          GUEST CAN PAUSE: {guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          HOST: {isHost.toString()}
        </Typography>
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
