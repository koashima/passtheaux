import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';
import RoomJoin from './RoomJoin';
import CreateRoom from './CreateRoom';
import Room from './Room';
import { useRoom } from '../hooks/use-room';

const Home = () => {
  const { roomCode, setRoomCode } = useRoom();

  useEffect(() => {
    const fetchData = async () => {
      await fetch('/api/user-in-room')
        .then((response) => response.json())
        .then((data) => {
          setRoomCode(data.code);
        });
    };
    fetchData();
  }, []);

  function renderHome() {
    return (
      <Grid
        container
        spacing={3}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom={true}>
            PASSTHEAUX
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup
            disableElevation
            variant="text"
            size="large"
          >
            <Button color="primary" to="/join" component={Link}>
              JOIN ROOM
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              CREATE ROOM
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => {
            return roomCode ? (
              <Redirect to={`/room/${roomCode}`} />
            ) : (
              renderHome()
            );
          }}
        />

        <Route path="/join" component={RoomJoin} />
        <Route path="/create" component={CreateRoom} />
        <Route path="/room/:roomCode" component={Room} />
      </Switch>
    </Router>
  );
};

export default Home;
