import { useState, createContext, useEffect } from 'react'

const AuthenticateContext = createContext()

const AuthenticateProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({})

  const data = { userAuth, setUserAuth }
useEffect(() => {

}, [])

  return (
    <AuthenticateContext.Provider value={data}>
      {children}
    </AuthenticateContext.Provider>
  )
}

export { AuthenticateProvider }

export default AuthenticateContext
