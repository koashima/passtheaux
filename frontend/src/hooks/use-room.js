import { useState, createContext, useContext } from 'react';

export const RoomContext = createContext();

export function useRoomState() {
  const [roomCode, setRoomCode] = useState(null);
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const clearRoomCode = () => {
    setRoomCode(null)
  }
  return {
    roomCode,
    setRoomCode,
    votesToSkip,
    setVotesToSkip,
    guestCanPause,
    setGuestCanPause,
    isHost,
    setIsHost,
    clearRoomCode
  };
}

export function useRoom() {
  const room = useContext(RoomContext)
  return room
}