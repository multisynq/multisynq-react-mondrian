import './styles.css'

import { useState } from 'react'
import {
  useReactModelRoot,
  useSetSession,
  useMultisynqSession,
  useConnectedViews,
} from '@multisynq/react' //prettier-ignore

import { BsPeopleFill } from 'react-icons/bs'

import RootModel from './models/root'

import Dropdown from './components/Dropdown'
import MultisynqQRCode from './components/MultisynqQRCode'
import Colors from './components/Colors'
import Painting from './components/Painting'

import { sessions } from './data/sessions'
import { colors } from './data/paintingCells'

type MondrianProps = {
  showQR: boolean
  showUserCount: boolean
  showSessionDropdown: boolean
}
export default function Mondrian({ showQR = true, showUserCount = true, showSessionDropdown = true }: MondrianProps) {
  const model = useReactModelRoot<RootModel>()

  const paintingCells = model.painting.cells
  const { viewCount: nUsers } = useConnectedViews()

  const [selectedColor, set_selectedColor] = useState(colors[0])

  const changeSession = useSetSession()
  const { name: sessionName } = useMultisynqSession()

  const resetPainting = model.painting.reset

  const paintCell = (cellId) => {
    if (selectedColor === null) return
    const payload = { cellId, newColor: selectedColor }
    model.painting.paint(payload)
  }

  const dropdownOptions = sessions.map((s) => ({ value: s, label: s.name }))
  const selectedOption = sessions.findIndex((s) => s.name === sessionName)
  const handleDropdownChange = (selectedIdx) => {
    const s = sessions[selectedIdx]
    changeSession({ name: s.name, password: s.password })

    // Update URL session
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('session', s.name)
    window.history.replaceState(null, '', `${window.location.pathname}?${searchParams.toString()}`)
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
          <MultisynqQRCode />
        </div>
      )}
    </div>
  )
}
