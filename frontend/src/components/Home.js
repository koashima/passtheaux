import React from 'react';
import RoomJoin from './RoomJoin';
import CreateRoom from './CreateRoom';
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
        <Route exact path="/"></Route>
        <Route path="/join" component={RoomJoin} />
        <Route path="/create" component={CreateRoom} />
      </Switch>
    </Router>
  );
};

export default Home;
