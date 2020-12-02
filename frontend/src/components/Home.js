import React from 'react';
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

const Home = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" />
        <Route path="/join" component={RoomJoin} />
        <Route path="/create" component={CreateRoom} />
        <Route path="/room/:roomCode" component={Room} />
      </Switch>
    </Router>
  );
};

export default Home;
