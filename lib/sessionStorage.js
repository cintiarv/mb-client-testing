function setToken (token) {
  sessionStorage.setItem('token', token)
  console.log("🚀 ~ setToken ~ token:", token)

}

function getToken () {
  if (typeof window !== 'undefined') {
    const x = sessionStorage.getItem('token')
    console.log("🚀 ~ getToken ~ x:", x)
    return sessionStorage.getItem('token')
  }
}

function deleteToken () {
  sessionStorage.removeItem('token')
}

export { setToken, getToken, deleteToken }
