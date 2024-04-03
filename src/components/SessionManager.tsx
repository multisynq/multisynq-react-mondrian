import { CroquetRoot } from '@croquet/react'
import RootModel from '../models/root'
import { useState } from 'react'
import App from '../App'

export default function SessionManager() {
  const [session, setSession] = useState({
    name: import.meta.env['VITE_CROQUET_NAME'],
    password: import.meta.env['VITE_CROQUET_PASSWORD'],
  })
  const { name, password } = session

  const renameSession = (newName: string) => {
    setSession({ name: newName, password })
  }

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
      <App sessionName={name} setSession={renameSession} />
    </CroquetRoot>
  )
}
