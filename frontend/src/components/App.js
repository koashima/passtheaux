import React, { useEffect } from 'react';
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
import { RoomContext, useRoomState } from '../hooks/use-room';

const App = () => {

  const { roomCode, setRoomCode } = useRoomState();

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

  const room = useRoomState()
  return (
    <RoomContext.Provider value={room}>
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
    </RoomContext.Provider>
  );
};

export default App;

const appDiv = document.getElementById('app');

render(<App />, appDiv);
