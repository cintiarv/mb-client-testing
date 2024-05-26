import React, { useState, useContext, useEffect } from 'react'
import SocketContext from '../contexts/SocketContext'
import AuthenticateContext from '../contexts/AuthenticateContext'
import io from 'socket.io-client'


export default function Notifications() {
  const [allNotifications, setAllNotifications] = useState([])
  const [isClickNotification, setIsClickNotification] = useState(false)
  const [isClickDropDown, setIsClickDropDown] = useState(false)

  /* const { socket } = useContext(SocketContext)
  useEffect(() => {
    socket.on('notifications:current', (notifications) => {
      setAllNotifications(notifications.notifications)
    })


    // return () => socket.off('current-notifications')
  }, [socket]) */
const [socket, setSocket] = useState(undefined)
  useEffect(() => {
    const socket = io('http://localhost:4000')
    console.log("🚀 ~ useEffect ~ socket:", socket)
    console.log('hello')
    setSocket(socket)
  }, [])
  


  const handleClickNotification = () => {
    setIsClickNotification(true)
    setIsClickDropDown(false)
    isClickNotification && setIsClickNotification(false)
  }


/*   useEffect(() => {
    socket.on('send-notification', (newNotification) => {
      setAllNotifications([newNotification, ...allNotifications])
      document.querySelector('.notification.circle.red').classList.add('active')
    })

    return () => socket.off('send-notification')
  }, [socket, allNotifications])
 */
  return (
    <div className='py-10 px-20'>
      <h1>notifications</h1>
      <div className={isClickNotification ? 'active-dropdown settings-content__notification' : 'settings-content__notification'} onClick={handleClickNotification}>
        <img src='/assets/icons/notification.svg' alt='Icono de notificaciones en versión desktop' />
        <p>{allNotifications?.length || 0}</p>
      </div>
    </div>
  )
}
