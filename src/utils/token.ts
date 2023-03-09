const env = import.meta.env

export const getToken = () => {
  const tokenKey = getTokenKey() || 'token'
  const token = localStorage.getItem(tokenKey)
  if (token) {
    return `Bearer ${token}`
  } else {
    return null
  }
}
export const setToken = (token: string) => {
  const tokenKey = getTokenKey() || 'token'

  if (!token) {
    console.error('token is null')
    return
  }

  if (typeof token !== 'string') {
    console.error('token is not string')
    return
  }

  localStorage.setItem(tokenKey, token)
}

export const getTokenKey = () => env?.TOKEN_KEY
