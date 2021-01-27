import React from 'react';
import { render } from 'react-dom';
import Home from './Home';
import { RoomContext, useRoomState } from '../hooks/use-room';

const App = () => {
  const room = useRoomState();
  return (
    <RoomContext.Provider value={room}>
      <Home />
    </RoomContext.Provider>
  );
};

export default App;

const appDiv = document.getElementById('app');

render(<App />, appDiv);
