import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const fullReloadAlways: Plugin = {
  name: 'full-reload',
  handleHotUpdate({ server }) {
    server.ws.send({ type: 'full-reload' })
    return []
  },
}

export default defineConfig({
  plugins: [react(), fullReloadAlways],
  base: './',
  build: {
    minify: false,
  },
})
