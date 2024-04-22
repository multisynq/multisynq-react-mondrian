import './styles.css'

import { CroquetRoot } from '@croquet/react'

import { sessions } from './data/sessions'
import { tutorialConfig } from './data/tutorialConfig'
import RootModel from './models/root'
import Mondrian from './Mondrian'

type ParamConfig = {
  sessionName: string | undefined
  showQR: boolean
  showUserCount: boolean
  showSessionDropdown: boolean
}
function parseParams() {
  let config = {} as ParamConfig
  const params = new URLSearchParams(document.location.search)

  const tutorial = params.get('tutorial')
  if (tutorial !== undefined && tutorialConfig[tutorial] !== undefined) {
    config = tutorialConfig[tutorial]
  }

  config.sessionName = params.get('session')

  function overrideBoolean(configName) {
    const value = params.get(configName)
    if (value === 'true') config[configName] = true
    else if (value === 'false') config[configName] = false
  }

  overrideBoolean('showQR')
  overrideBoolean('showUserCount')
  overrideBoolean('showSessionDropdown')

  return config
}

export default function App() {
  const { sessionName, showQR, showUserCount, showSessionDropdown } = parseParams()

  // Get default session from URL params, or default to first session
  const defaultSession = sessions.find((s) => s.name === sessionName) || sessions[0]
  const { name, password } = defaultSession

  return (
    <CroquetRoot
      sessionParams={{
        model: RootModel,
        appId: import.meta.env['VITE_CROQUET_APP_ID'],
        apiKey: import.meta.env['VITE_CROQUET_API_KEY'],
        name,
        password,
        options: {
          trackViews: true,
        },
      }}
    >
      <Mondrian {...{ showQR, showUserCount, showSessionDropdown }} />
    </CroquetRoot>
  )
}
