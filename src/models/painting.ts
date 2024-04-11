import { defaultPaintingCells } from "../data/paintingCells";
import { ReactModel } from '../bindings';

export class PaintingModel extends ReactModel {  
  cells: { id: number; color: string }[];

  init(options) {
    // super.init({
    //   ...options,
    //   handlers: [
    //     this.paint,
    //     this.reset
    //   ]
    // })
    super.init(options);
    this.cells = defaultPaintingCells;

    this.subscribe(this.id, "paint", this.paint);
    this.subscribe(this.id, "reset", this.reset);
  }

  reset() {
    this.cells = defaultPaintingCells;
    this.publish(this.id, "paintingReset");
  }

  paint(data) {
    if (!data) return;
    const { cellId, newColor } = data;
    this.cells = this.cells.map((cell) =>
      cell.id === cellId ? { ...cell, color: newColor } : cell
    );
    this.publish(this.id, "cellPainted");
  }
}
PaintingModel.register("PaintingModel");
