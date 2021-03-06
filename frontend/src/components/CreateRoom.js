import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useRoom } from '../hooks/use-room';
import {
  ButtonGroup,
  Button,
  Grid,
  TextField,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Collapse,
} from '@material-ui/core/';

const CreateRoom = ({ roomCode, updateCallback }) => {
  const {
    votesToSkip,
    setVotesToSkip,
    guestCanPause,
    setGuestCanPause,
    settings,
    setSettings,
    message,
    setMessage,
  } = useRoom();

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
    fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => history.push('/room/' + data.code));
  };

  const handleUpdateRoom = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: roomCode,
      }),
    };
    fetch('/api/update-room', requestOptions).then((response) =>
      response.ok
        ? setMessage('Room updated successfully :)')
        : setMessage('Error updating room :(')
    );
    updateCallback();
  };

  const createButtons = () => {
    return (
      <ButtonGroup
        disableElevation
        variant="contained"
        orientation="vertical"
        size="large"
      >
        <Button color="primary" variant="contained" onClick={handleCreateRoom}>
          CREATE ROOM
        </Button>

        <Button color="secondary" to="/" variant="contained" component={Link}>
          BACK
        </Button>
      </ButtonGroup>
    );
  };

  const updateButtons = () => {
    return (
      <ButtonGroup disableElevation variant="contained" orientation="vertical" size="large">
        <Button color="primary" onClick={handleUpdateRoom}>
          UPDATE ROOM
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            setSettings(false);
            setMessage('');
            updateCallback();
          }}
        >
          CLOSE
        </Button>
      </ButtonGroup>
    );
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
        <Collapse
          in={message != ''}
          style={{ fontSize: 'x-large', color: '#3F51B5' }}
        >
          {message}
        </Collapse>
      </Grid>
      <Grid item xs={12}>
        <Typography component="h4" variant="h4">
          {settings ? 'UPDATE ROOM' : 'CREATE ROOM'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center" style={{ color: '#f5f5f5' }}>
              GUEST CONTROL OF PLAYBACK STATE
            </div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause.toString()}
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
      <Grid item xs={12}>
        <FormControl>
          <TextField
            required={true}
            type="number"
            defaultValue={votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: 'center', color: '#f5f5f5' },
            }}
            onChange={(e) => {
              setVotesToSkip(e.target.value);
            }}
          />
          <FormHelperText style={{ color: '#f5f5f5' }}>
            <div align="center">VOTES TO SKIP SONG</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      {settings === true ? updateButtons() : createButtons()}
    </Grid>
  );
};

export default CreateRoom;
