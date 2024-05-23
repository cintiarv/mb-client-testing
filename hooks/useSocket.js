import { useMemo, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { getToken } from '../lib/sessionStorage'

export const useSocket = (serverPath) => {
  // useMemo se utiliza para verificar si el serverPath cambia
  // si no cambia no se conectará nuevamente al socket solamente hasta que cambie

  const options = { transport: ['websocket'] }

  if (getToken()) options.query = { token: getToken() }

  const socket = useMemo(() => io.connect(serverPath, options), [serverPath])

  const [online, setOnline] = useState(false)

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
    })

    socket.on('disconnect', () => {
      setOnline(false)
    })
    socket.on('disconnecting', () => {
      setOnline(false)
    })
  }, [socket])

  return {
    socket, online
  }
}
