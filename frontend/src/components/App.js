import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import RoomJoin from './RoomJoin';
import CreateRoom from './CreateRoom';
import Room from './Room';
import Home from './Home';
import useRoomCode from '../hooks/use-roomCode';

const App = () => {
  const { roomCode, setRoomCode } = useRoomCode();

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

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              return roomCode ? (
                <Redirect to={`/room/${roomCode}`} />
              ) : (
                <Route exact path="/" component={Home} />
              );
            }}
          />

          <Route path="/join" component={RoomJoin} />
          <Route path="/create" component={CreateRoom} />
          <Route path="/room/:roomCode" component={Room} />
        </Switch>
      </Router>
    </>
  );
};

export default App;

const appDiv = document.getElementById('app');

render(<App />, appDiv);
