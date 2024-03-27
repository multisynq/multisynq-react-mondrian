import { createRoot } from 'react-dom/client'

import { CroquetRoot } from '@croquet/react'
import RootModel from './src/models/root'

import App from './src/App'

const container = document.getElementById('root')
createRoot(container!).render(
  <CroquetRoot
    sessionParams={{
      model: RootModel,
      name: import.meta.env['VITE_CROQUET_NAME'],
      appId: import.meta.env['VITE_CROQUET_APP_ID'],
      apiKey: import.meta.env['VITE_CROQUET_API_KEY'],
      password: import.meta.env['VITE_CROQUET_PASSWORD'],
    }}
  >
    <App />
  </CroquetRoot>
)
