import './styles.css'

import { useState } from 'react'
import { useModelRoot, usePublish, useSubscribe } from '@croquet/react'

import PaintingModel from './models/painting'
import Colors from './components/Colors'
import Painting from './components/Painting'

export default function App() {
  const model: PaintingModel = useModelRoot() as PaintingModel

  const [paintingCells, set_paintingCells] = useState(model.cells)
  const [selectedColor, set_selectedColor] = useState(null)

  useSubscribe(model.id, 'cellPainted',   () => set_paintingCells(model.cells))
  useSubscribe(model.id, 'paintingReset', () => set_paintingCells(model.cells))

  const publishPaint  = usePublish((data) => [model.id, 'paint', data])
  const resetPainting = usePublish((    ) => [model.id, 'reset'      ])

  const paintCell = (cellId) => {
    if(selectedColor === null) return
    const payload = { cellId, newColor: selectedColor }
    publishPaint(payload)
  }

  return (
    <div className='App'>
      <Colors {...{ selectedColor, set_selectedColor }}/>
      <Painting {...{ paintingCells, onClick: paintCell }}/>
      <button onClick={resetPainting}>Reset Colors</button>
    </div>
  )
}