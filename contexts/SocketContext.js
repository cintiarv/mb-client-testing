import { createContext } from 'react'
import { useSocket } from '../hooks/useSocket'

const SocketContext = createContext('')

export const SocketProvider = ({ children }) => {
  const { socket, online } = useSocket(process.env.NEXT_PUBLIC_URL_BACKEND_API)

  const data = { socket, online }
  return (
    <SocketContext.Provider value={data}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContext
