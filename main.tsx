import { createRoot } from 'react-dom/client'

import { CroquetRoot } from '@croquet/react'
import PaintingModel from './src/models/painting'

import App from './src/App'

const container = document.getElementById('root')
createRoot(container!).render(
  <CroquetRoot
    sessionParams={{
      name: 'painting',
      model: PaintingModel,
      appId: import.meta.env['VITE_CROQUET_APP_ID'],
      apiKey: import.meta.env['VITE_CROQUET_API_KEY'],
      password: 'abc',
    }}
  >
    <App />
  </CroquetRoot>
)
