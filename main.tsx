import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  return <div>Hello World</div>
}

const rootElement = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
)