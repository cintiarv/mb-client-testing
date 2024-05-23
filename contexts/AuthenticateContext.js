import { useState, createContext } from 'react'

const AuthenticateContext = createContext()

const AuthenticateProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({})

  const data = { userAuth, setUserAuth }

  return (
    <AuthenticateContext.Provider value={data}>
      {children}
    </AuthenticateContext.Provider>
  )
}

export { AuthenticateProvider }

export default AuthenticateContext
