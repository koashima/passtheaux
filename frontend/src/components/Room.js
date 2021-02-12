import React, { useEffect } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
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
        });
    };
    getRoomDetails();
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
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setSettings(true)}
        >
          SETTINGS
        </Button>
      </Grid>
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

      {isHost ? showSettingsButton() : null}

      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={handleLeaveRoom}>
          LEAVE
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;
