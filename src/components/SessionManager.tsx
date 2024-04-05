import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react'
import { CroquetRoot } from '@croquet/react'
import { sessions } from '../data/sessions'

import RootModel from '../models/root'

const SessionContext = createContext(null)

export default function SessionManager({ children }) {
  const searchParams = new URLSearchParams(document.location.search)
  const defaultSession = searchParams.get('session')
  const [session, setSession] = useState(sessions.find((s) => s.name === defaultSession) || sessions[0])
  const { name, password } = session

  const changeSession = useCallback((newName: string, newPassword: string) => {
    const s = sessions.find((s) => s.name === newName)
    if (s !== undefined) {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set('session', s.name)
      window.history.replaceState(null, '', `${window.location.pathname}?${searchParams.toString()}`)
      setSession({ name: newName, password: newPassword })
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      sessionName: name,
      changeSession,
    }),
    [session, changeSession]
  )

  return (
    <CroquetRoot
      key={Math.random()}
      sessionParams={{
        model: RootModel,
        appId: import.meta.env['VITE_CROQUET_APP_ID'],
        apiKey: import.meta.env['VITE_CROQUET_API_KEY'],
        name,
        password,
      }}
    >
      <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>
    </CroquetRoot>
  )
}

export function useSessionManager() {
  const context = useContext(SessionContext)
  if (context === null) {
    throw new Error('You must be inside a SessionManager context')
  }
  return context
}
