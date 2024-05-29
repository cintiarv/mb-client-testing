import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import AuthenticateContext from '../contexts/AuthenticateContext'
import SocketContext from '../contexts/SocketContext'

import format from 'date-fns'
import mutations from '../services/notifications/mutations'

import WrapperCard from '../app/components/WrapperCard'
import SETTINGS_ICON from '../public/assets/icons/settings_icon.svg'
import CLOSE_ICON from '../public/assets/icons/close-icon.svg'
import NOTIFICATION_ICON from '../public/assets/icons/notifications-green.svg'
import { deleteToken } from '../lib/sessionStorage'

const SettingsMenuFloat = () => {
  const { userAuth, setUserAuth } = useContext(AuthenticateContext)
  const userName = userAuth ? userAuth.fullName : ''
  const userNameSplit = userName ? userName.split(' ') : ''
  const initials = (userNameSplit[0] ? userNameSplit[0]?.charAt(0) : '') + (userNameSplit[1] ? userNameSplit[1]?.charAt(0) : '')
  const { socket } = useContext(SocketContext)
  const [allNotifications, setAllNotifications] = useState([])
  const [deleteNotif, setDeleteNotif] = useState(false)
  const [icon, setIcon] = useState(SETTINGS_ICON)
  const [isClickSettings, setIsClickSettings] = useState(false)
  const [isClickDropDown, setIsClickDropDown] = useState(false)
  const [isClickNotification, setIsClickNotification] = useState(false)

  const router = useRouter()

  /*  useEffect(() => {
     setNotifications(userAuth?.notifications)
   }, []) */

  useEffect(() => {
    socket.on('notifications:current', (notifications) => {
      setAllNotifications(notifications.notifications)
    })

    // return () => socket.off('current-notifications')
  }, [socket])

  useEffect(() => {
    console.log('userAuth :>> ', userAuth);
    socket.on('send-notification', (newNotification) => {
      setAllNotifications([newNotification, ...allNotifications])
      document.querySelector('.notification.circle.red').classList.add('active')
    })

    return () => socket.off('send-notification')
  }, [socket, allNotifications])

  const handleRemoveNotification = (idNotification) => {
    socket.emit('remove-notification', (idNotification))
  }

  const handleClickBtn = () => {
    setIcon(CLOSE_ICON)
    setAllNotifications(userAuth?.notifications)
    if (icon === CLOSE_ICON) {
      setIcon(SETTINGS_ICON)
      setIsClickSettings(false)
      setIsClickDropDown(false)
      setIsClickNotification(false)
    } else {
      setIsClickSettings(true)
    }
  }

  const handleClickDropDown = () => {
    setIsClickDropDown(true)
    setIsClickNotification(false)
    isClickDropDown && setIsClickDropDown(false)
  }
  const handleClickNotification = () => {
    setIsClickNotification(true)
    setIsClickDropDown(false)
    isClickNotification && setIsClickNotification(false)
  }

  const logout = () => {
    deleteToken()
    setUserAuth({})
    router.push('/')
  }

  return (
    <>
      <div className='col-12 display:flex flex-row-reverse bd-highlight px-4'>
        <div className='settings'>
          <div className='settings-btn display:none d-lg-block d-lg-flex' onClick={handleClickBtn}>
            <Image src={icon} alt='Icono de configuracion' />
          </div>
          <div className={isClickSettings ? 'settings-content show-settings display:none d-lg-block d-lg-flex' : 'display:none'}>
            <div className={isClickNotification ? 'active-dropdown settings-content__notification' : 'settings-content__notification'} onClick={handleClickNotification}>
              <img src='/assets/icons/notification.svg' alt='Icono de notificaciones en versión desktop' />
              <p>{allNotifications?.length || 0}</p>
            </div>
            <div className={isClickDropDown ? 'active-dropdown settings-content__dropdown' : 'settings-content__dropdown'} onClick={handleClickDropDown}>
              <p>{initials}</p>
              <img src='/assets/icons/expand_icon.svg' alt='Icono para expandir opciones en versión desktop' />
            </div>
          </div>
          <div className='settings-content display:block display:flex d-lg-none show-settings'>
            <div className={isClickNotification ? 'active-dropdown settings-content__notification' : 'settings-content__notification'} onClick={handleClickNotification}>
              <img src='/assets/icons/notification.svg' alt='Icono de notificaciones en versión móvil' />
              <p>{allNotifications?.length || 0}</p>
            </div>
            <div className={isClickDropDown ? 'active-dropdown settings-content__dropdown' : 'settings-content__dropdown'} onClick={handleClickDropDown}>
              <p>{initials}</p>
              <img src='/assets/icons/expand_icon.svg' alt='Icono para expandir opciones en versión móvil' />
            </div>
          </div>
        </div>
        <div className='dropdown display:flex flex-row-reverse bd-highlight'>
          <ul className={isClickDropDown ? 'dropdown-active display:block' : 'display:none'}>
            <li className='dropdown-active__options'>
              <p className='profile-avatar'>{initials}</p>
              <div className='profile-description'>
                <p>{userAuth ? userAuth.email : 'Usuario'}</p>
              </div>
            </li>
            <hr />
            <li className='dropdown-active__options-config'>
              <Link href='perfil'>
                <img src='/assets/icons/account-icon.svg' alt='Icono de perfil' />
                <p>Configuración</p>
              </Link>
            </li>
            <hr />
            <li className='dropdown-active__options-logout'>
              <div onClick={() => logout()}>
                <img src='/assets/icons/logout-icon.svg' alt='Icono de cerrar sesión' />
                <p>Cerrar sesión</p>
              </div>
            </li>
          </ul>
        </div>
        <div className='display:flex flex-row-reverse bd-highlight'>
          <div className={isClickNotification ? 'notification-section' : 'display:none'}>
            <WrapperCard
              icon={NOTIFICATION_ICON}
              title='Notificaciones'
            >
              <div className='notification-section__container'>
                {
                  allNotifications?.length
                    ? (
                        allNotifications?.map((notification) => (
                          <div key={notification?.id} className='notification-section__container-card display:flex'>
                            <img src='/assets/images/landrada-outlined-logo.svg' alt='Logo de Landrada Desarrollos' />
                            <div className='notification-section__container-card-description mx-4'>
                              <p className='my-0'>{notification?.title}</p>
                              {userAuth?.type == 'ADMIN' || userAuth?.type == 'MANAGER' || userAuth?.type == 'DIRECTOR'
                                ? <p className='my-0'>{notification?.description}</p>
                                : ''}
                              <div className='display:flex'>
                                <img src='/assets/icons/clock-icon.svg' alt='Icono de un reloj' />

                                <p className='my-1 mx-1'>{
                                format(new Date(notification?.date), 'dd-MMM-yyyy p') || ''
                              }
                                </p>
                              </div>
                            </div>
                            <img className='notification-section__container-card-close-icon' src='/assets/icons/icon-close-gray.svg' alt='Icono para eliminar notificación' onClick={() => handleRemoveNotification(notification._id)} />
                          </div>
                        )).reverse()
                      )
                    : <p className='text-center'>Sin notificaciones</p>
                }.

                .
              </div>
            </WrapperCard>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsMenuFloat
