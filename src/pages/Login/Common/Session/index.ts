import { sessionCodeKey, sessionKey } from '../Code/Hooks/config'

export function sessionSync() {
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
    get: () => {
      return {
        time: getItem(sessionCodeKey),
        phone: getItem(sessionKey),
      }
    },
    set: ({ time, phone }: { phone?: string; time?: string }) => {
      if (phone) {
        setItem(sessionKey, phone)
      }

      if (time) {
        setItem(sessionCodeKey, time)
      }
    },
    clear: () => {
      removeItem(sessionCodeKey)
      removeItem(sessionKey)
    },
  }
}
