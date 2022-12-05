import React from 'react'
import { useParams } from 'react-router-dom'
import { chatRooms } from './CraigChat'
import MessageInputs from '../components/MessageInputs'

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
    <MessageInputs roomId={room.id} />
    </div>
  )
}

export default ChatRoom