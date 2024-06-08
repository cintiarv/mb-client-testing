import React, { useContext } from 'react'
import SocketContext from '../contexts/SocketContext'
import Notifications from './notifications'

//cualquier evento que arroje una notificación tendrá esta lógica en su componente con el componente de la campana de notificaciones al principio.

const sendNotif = () => {
    const { socket } = useContext(SocketContext)
    const sendNotification = () => {
        socket.emit("new-notification", { title: "new notif from client testing!" })
        console.log('i just send a notif')
    }
    return (
        <div>
            <Notifications />
            <h2>Cualquier evento que arroje una notificación</h2>
            <button onClick={sendNotification}>Click here to send a notification</button>
        </div>
    )
}

export default sendNotif
