import './styles.css'

import { useState } from 'react'

import Colors from './components/Colors'
import Painting from './components/Painting'

import { defaultPaintingCells } from './data/paintingCells'


export default function App() {

  const [paintingCells, set_paintingCells] = useState(defaultPaintingCells)
  const [selectedColor, set_selectedColor] = useState('')

  const resetColors = () => {
    set_paintingCells(defaultPaintingCells)
  }

  const paintCell = (cellId) => {
    if(selectedColor === '') {
      return;
    }
    set_paintingCells((prev) => prev.map((cell) => cell.id === cellId ? { ...cell, color: selectedColor } : cell))
  }

  return (
    <div className='App'>
      <Colors {...{ selectedColor, set_selectedColor }}/>
      <Painting {...{ paintingCells, onClick: paintCell }}/>
      <button onClick={resetColors}>Reset Colors</button>
    </div>
  )
}