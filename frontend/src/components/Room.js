import React from 'react';
import { useState } from 'react';

const Room = (props) => {
  let [votesToSkip, setVotesToSkip] = useState(2);
  let [guestCanPause, setGuestCanPause] = useState(false);
  let [isHost, setIsHost] = useState(false);

  let roomCode = props.match.params.roomCode;

  const getRoomDetails = () => {
    fetch('/api/get-room' + '?code=' + roomCode)
      .then((response) => response.json())
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  };
  getRoomDetails();
  return (
    <div>
      <h1>CODE: {roomCode}</h1>
      <h1>VOTES TO SKIP: {votesToSkip}</h1>
      <h1>GUEST CAN PAUSE: {guestCanPause.toString()}</h1>
      <h1>HOST: {isHost.toString()}</h1>
    </div>
  );
};

export default Room;
