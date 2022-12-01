import React from 'react'
import { Link } from 'react-router-dom';

export const chatRooms = [
    { id: 'dogs', title: '🐶 Dogs 🐶' },
    { id: 'food', title: '🍔 Food 🍔' },
    { id: 'general', title: '💬 General 💬' },
    { id: 'news', title: '🗞 News 🗞' },
    { id: 'music', title: '🎹 Music 🎹' },
    { id: 'sports', title: '🏈 Sports 🏈' },
];

const CraigChat = () => {
  return (
    <div>
    {
        chatRooms.map(room => {
            return(
                <li key={room.id}>
                    <Link to={`/room/${room.id}`}>{room.title}</Link>
                </li>
            )
        })
    }
    </div>
  )
}

export default CraigChat
