import { defaultPaintingCells } from '../data/paintingCells'
import { ReactModel } from '../bindings'

export class PaintingModel extends ReactModel {
  cells: { id: number; color: string }[]

  init(options) {
    // super.init({
    //   ...options,
    //   handlers: [
    //     this.paint,
    //     this.reset
    //   ]
    // })
    super.init(options)
    this.reset()

    this.subscribe(this.id, 'paint', this.paint)
    this.subscribe(this.id, 'reset', this.reset)
  }

  reset() {
    // Creating a clone to avoid mutating the default cells
    // when changing the painting color
    this.cells = structuredClone(defaultPaintingCells)
  }

  paint(data) {
    if (!data) return
    const { cellId, newColor } = data
    this.cells[cellId].color = newColor
  }
}
PaintingModel.register('PaintingModel')
