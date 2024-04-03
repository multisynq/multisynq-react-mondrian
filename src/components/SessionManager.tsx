import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { CroquetRoot } from '@croquet/react'

import RootModel from '../models/root'

const SessionContext = createContext(null)

export default function SessionManager({ children }) {
  const [session, setSession] = useState({
    name: import.meta.env['VITE_CROQUET_NAME'],
    password: import.meta.env['VITE_CROQUET_PASSWORD'],
  })
  const { name, password } = session

  const renameSession = useCallback((newName: string) => {
    setSession({ name: newName, password })
  }, [])

  const contextValue = useMemo(
    () => ({
      sessionName: name,
      renameSession,
    }),
    [session, renameSession]
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
