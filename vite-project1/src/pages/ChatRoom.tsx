import React from 'react'
import { useParams } from 'react-router-dom'
import { chatRooms } from './CraigChat'

const ChatRoom = () => {
  const params = useParams()

  const room = chatRooms.find((x) => x.id === params.id);
    if (!room) {
        return(
          <h4>Room doesn't exist</h4>
        )
    }

  return (
    <div>
      <h3>{room.title} ChatRoom</h3>

    </div>
  )
}

export default ChatRoom