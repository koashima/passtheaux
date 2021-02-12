import { useState, createContext, useContext } from 'react';

export const RoomContext = createContext();

export function useRoomState() {
  const [roomCode, setRoomCode] = useState(null);
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [isHost, setIsHost] = useState(false);
  const [settings, setSettings] = useState(false);
  const [message, setMessage] = useState('');
  const clearRoomCode = () => {
    setRoomCode(null);
  };
  return {
    roomCode,
    setRoomCode,
    votesToSkip,
    setVotesToSkip,
    guestCanPause,
    setGuestCanPause,
    isHost,
    setIsHost,
    clearRoomCode,
    settings,
    setSettings,
    message,
    setMessage,
  };
}

export function useRoom() {
  const room = useContext(RoomContext);
  return room;
}
