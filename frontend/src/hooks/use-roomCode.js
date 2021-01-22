import { useState } from 'react';


export default function useRoomCode() {

  const [roomCode, setRoomCode] = useState(null);

  return {
    roomCode,
    setRoomCode
  }
}
 