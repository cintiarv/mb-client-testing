function setToken (token) {
  sessionStorage.setItem('token', token)
}

function getToken () {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('token')
  }
}

function deleteToken () {
  sessionStorage.removeItem('token')
}

export { setToken, getToken, deleteToken }
