import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import RoomJoin from './RoomJoin';
import CreateRoom from './CreateRoom';
import Room from './Room';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Home from './Home';

const App = () => {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetch('/api/user-in-room')
        .then((response) => response.json())
        .then((data) => {
          setRoomCode(data.code);
        });
    };
    return () => {
      fetchData();
    };
  }, []);

  return (
    <>
      <Router>
        <Switch>
          {roomCode ? (
            <Redirect to={`/room/${roomCode}`} />
          ) : (
            <Route exact path="/" component={Home} />
          )}

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
