import React, { useState } from 'react';
import {
  TextField,
  ButtonGroup,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

const RoomJoin = () => {
  const history = useHistory();
  const [state, setState] = useState({
    roomCode: '',
    error: '',
  });

  const handleCodeChange = (e) => {
    setState({
      ...state,
      roomCode: e.target.value,
    });
  };

  const handleJoinBtn = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: state.roomCode,
      }),
    };
    fetch('api/join-room', requestOptions)
      .then((response) => {
        response.ok
          ? history.push(`/room/${state.roomCode}`)
          : setState({ ...state, error: 'ROOM NOT FOUND' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          JOIN ROOM
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={state.error}
          label="Code"
          placeholder="ENTER ROOM CODE"
          value={state.roomCode}
          helperText={state.error}
          variant="filled"
          onChange={handleCodeChange}
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          disableElevation
          variant="contained"
          orientation="vertical"
          size="large"
        >
          <Button color="primary" to="/" onClick={handleJoinBtn}>
            JOIN
          </Button>
          <Button color="secondary" to="/" component={Link}>
            HOME
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default RoomJoin;
