import { Model } from '@croquet/react'
import { defaultPaintingCells } from '../data/paintingCells'

class PaintingModel extends Model {
  cells: { id: number; color: string }[]

  init(options) {
    super.init(options)
    this.cells = defaultPaintingCells

    this.subscribe(this.id, 'paint', this.paintCell)
    this.subscribe(this.id, 'reset', this.resetPainting)
  }

  resetPainting() {
    this.cells = defaultPaintingCells
    this.publish(this.id, 'paintingReset')
  }

  paintCell(data) {
    if (!data) return
    const { cellId, newColor } = data
    this.cells = this.cells.map((cell) => (cell.id === cellId ? { ...cell, color: newColor } : cell))
    this.publish(this.id, 'cellPainted')
  }
}

PaintingModel.register('PaintingModel')

export default PaintingModel
