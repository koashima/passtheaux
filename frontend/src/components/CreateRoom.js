import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  Grid,
  TextField,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core/';

const CreateRoom = () => {
  let defaultVotes = 2;
  let [guestCanPause, setGuestCanPause] = useState(true);
  let [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const history = useHistory();

  const handleCreateRoom = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    fetch('api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => history.push('/room/' + data.code));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          CREATE ROOM
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">GUEST CONTROL OF PLAYBACK STATE</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            onChange={(e) => {
              setGuestCanPause(e.target.value === 'true' ? true : false);
            }}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="PLAY/PLAUSE"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="NO CONTROL"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            defaultValue={defaultVotes}
            inputProps={{ min: 1, style: { textAlign: 'center' } }}
            onChange={(e) => {
              setVotesToSkip(e.target.value);
            }}
          />
          <FormHelperText>
            <div align="center">VOTES TO SKIP SONG</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={handleCreateRoom}>
          CREATE ROOM
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          BACK
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRoom;
