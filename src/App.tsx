import './styles.css'

import { useState } from 'react'
import { useModelRoot, usePublish, useSubscribe } from '@croquet/react'

import { BsPeopleFill } from 'react-icons/bs'

import RootModel from './models/root'
import Colors from './components/Colors'
import Painting from './components/Painting'
import CroquetQRCode from './components/CroquetQRCode'

export default function App() {
  const model: RootModel = useModelRoot() as RootModel
  const [paintingCells, set_paintingCells] = useState(model.painting.cells)
  const [users, set_users] = useState(model.users)
  const [selectedColor, set_selectedColor] = useState(null)

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

  return (
    <div className='App'>
      <div className='user-count'>
        <BsPeopleFill />
        <span>{nUsers}</span>
      </div>
      <Colors {...{ selectedColor, set_selectedColor, resetPainting }} />
      <Painting {...{ paintingCells, onClick: paintCell }} />
      <CroquetQRCode />
    </div>
  )
}
