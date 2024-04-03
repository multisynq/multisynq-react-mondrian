import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './src/App'
import SessionManager from './src/components/SessionManager'

const container = document.getElementById('root')
createRoot(container!).render(
  <StrictMode>
    <SessionManager />
    {/* <App /> */}
    {/* </SessionManager> */}
  </StrictMode>
)
