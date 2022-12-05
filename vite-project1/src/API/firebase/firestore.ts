import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../App'

export async function sendMessage(roomId, user, text) {
    try {
        await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp()
        })
    }
    catch (e) {
        console.log(e)
    }
}