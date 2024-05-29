import { useState, createContext, useEffect } from 'react'

const AuthenticateContext = createContext()

const AuthenticateProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({})
  console.log("🚀 ~ AuthenticateProvider ~ userAuth:", userAuth)

  const data = { userAuth, setUserAuth }
useEffect(() => {
  console.log("🚀 ~ AuthenticateProvider ~ data:", data)

}, [])

  return (
    <AuthenticateContext.Provider value={data}>
      {children}
    </AuthenticateContext.Provider>
  )
}

export { AuthenticateProvider }

export default AuthenticateContext
