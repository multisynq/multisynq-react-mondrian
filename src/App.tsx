import './styles.css'

import { useState } from 'react'
import { useModelRoot, usePublish, useSubscribe } from '@croquet/react'

import { BsPeopleFill } from 'react-icons/bs'

import RootModel from './models/root'
import Colors from './components/Colors'
import Painting from './components/Painting'
import Dropdown from './components/Dropdown'
import { useSessionManager } from './components/SessionManager'
import CroquetQRCode from './components/CroquetQRCode'

import { sessions } from './data/sessions'
import { colors } from './data/paintingCells'
import { tutorialConfig } from './data/tutorialConfig'

function parseParams(params: URLSearchParams) {
  const tutorial = params.get('tutorial')
  if (tutorial !== undefined && tutorialConfig[tutorial] !== undefined) {
    console.log(tutorial)
    return tutorialConfig[tutorial]
  }

  const showQR = params.get('showQR') !== 'false'
  const showUserCount = params.get('showUserCount') !== 'false'
  const showSessionDropdown = params.get('showSessionDropdown') !== 'false'
  return { showQR, showUserCount, showSessionDropdown }
}

export default function App() {
  // This allows to control which components are displayed in this demo
  const { showQR, showUserCount, showSessionDropdown } = parseParams(new URLSearchParams(document.location.search))

  const model: RootModel = useModelRoot() as RootModel
  const [paintingCells, set_paintingCells] = useState(model.painting.cells)
  const [users, set_users] = useState(model.users)
  const [selectedColor, set_selectedColor] = useState(colors[0])

  const { sessionName, changeSession } = useSessionManager()

  useSubscribe(model.painting.id, 'cellPainted', () => set_paintingCells(model.painting.cells))
  useSubscribe(model.painting.id, 'paintingReset', () => set_paintingCells(model.painting.cells))

  useSubscribe(model.id, 'userJoined', () => set_users(new Set(model.users)))
  useSubscribe(model.id, 'userLeft', () => set_users(new Set(model.users)))

  const nUsers = users.size

  const publishPaint = usePublish((data) => [model.painting.id, 'paint', data]) // prettier-ignore
  const resetPainting = usePublish(() => [model.painting.id, 'reset']) // prettier-ignore

  const paintCell = (cellId) => {
    if (selectedColor === null) return
    const payload = { cellId, newColor: selectedColor }
    publishPaint(payload)
  }

  const dropdownOptions = sessions.map((s) => ({ value: s, label: s.name }))
  const selectedOption = sessions.findIndex((s) => s.name === sessionName)
  const handleDropdownChange = (selectedIdx) => {
    const s = sessions[selectedIdx]
    changeSession(s.name, s.password)
  }

  return (
    <div className='App'>
      {showSessionDropdown && (
        <Dropdown
          {...{
            selected: selectedOption,
            options: dropdownOptions,
            onChange: handleDropdownChange,
          }}
        />
      )}

      {showUserCount && (
        <div className='user-count'>
          <BsPeopleFill />
          <span>{nUsers}</span>
        </div>
      )}

      <Colors {...{ selectedColor, set_selectedColor, resetPainting }} />
      <Painting {...{ paintingCells, onClick: paintCell }} />
      {showQR && (
        <div className='qr-container'>
          <CroquetQRCode />
        </div>
      )}
    </div>
  )
}
