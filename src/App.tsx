import './styles.css'

import { useState } from 'react'

import Colors from './components/Colors'
import Painting from './components/Painting'

import { defaultPaintingCells } from './data/paintingCells'


export default function App() {

  const [paintingCells, set_paintingCells] = useState(defaultPaintingCells)
  const [selectedColor, set_selectedColor] = useState('')

  const paintCell = (cellId, newColor) => {
    set_paintingCells((prev) => prev.map((cell) => cell.id === cellId ? { ...cell, color: newColor } : cell))
  }

  return (
    <div>
      <Painting {...{ paintingCells }}/>
      <Colors {...{ selectedColor, set_selectedColor }}/>
    </div>
  )
}