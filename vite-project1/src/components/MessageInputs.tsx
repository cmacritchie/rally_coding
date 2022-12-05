import React, { useState } from 'react'
import { sendMessage } from '../API/firebase/firestore'
import { useAuth } from '../hooks/useAuth'


const MessageInputs = ({ roomId }) => {
    const user = useAuth()
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(roomId, user, message)
    }

    const handleChange = (e) => {
        
    }

  return (
    <form onSubmit={handleSubmit}>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit" disabled={message.length < 1} className="send-message">
                Send
        </button>
    </form>
  )
}

export default MessageInputs