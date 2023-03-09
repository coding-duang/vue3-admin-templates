export function cacheCode(sessionKey: string) {
  const sessionCodeKey = `${sessionKey}_code`
  const getItem = (key: string) => {
    return window.sessionStorage.getItem(key)
  }

  const setItem = (key: string, value: string) => {
    window.sessionStorage.setItem(key, value)
  }

  const removeItem = (key: string) => {
    window.sessionStorage.removeItem(key)
  }

  return {
    get: () => getItem(sessionCodeKey),
    set: (time: string) => {
      if (time) setItem(sessionCodeKey, time)
    },
    clear: () => {
      removeItem(sessionCodeKey)
    },
  }
}
