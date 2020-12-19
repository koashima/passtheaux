import React from 'react';
import { useState } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Room = (props) => {
  let [votesToSkip, setVotesToSkip] = useState(2);
  let [guestCanPause, setGuestCanPause] = useState(false);
  let [isHost, setIsHost] = useState(false);

  let roomCode = props.match.params.roomCode;

  const getRoomDetails = () => {
    fetch('/api/get-room' + '?code=' + roomCode)
      .then((response) => response.json())
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  };
  getRoomDetails();
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
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" to="/" component={Link}>
          LEAVE
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;
