import { useState } from "react";
import { Model, useModelRoot, usePublish, useSubscribe } from "@croquet/react";
import { defaultPaintingCells } from "../data/paintingCells";

export class PaintingModel extends Model {
  cells: { id: number; color: string }[];

  init(options) {
    super.init(options);
    this.cells = defaultPaintingCells;

    this.subscribe(this.id, "paint", this.paintCell);
    this.subscribe(this.id, "reset", this.resetPainting);
  }

  resetPainting() {
    this.cells = defaultPaintingCells;
    this.publish(this.id, "paintingReset");
  }

  paintCell(data) {
    if (!data) return;
    const { cellId, newColor } = data;
    this.cells = this.cells.map((cell) =>
      cell.id === cellId ? { ...cell, color: newColor } : cell
    );
    this.publish(this.id, "cellPainted");
  }
}
PaintingModel.register("PaintingModel");

export function usePaintingModel() {
  const model: PaintingModel = useModelRoot() as PaintingModel;

  const [paintingCells, set_paintingCells] = useState(model.cells);
  useSubscribe(model.id, "cellPainted",   () => set_paintingCells(model.cells));
  useSubscribe(model.id, "paintingReset", () => set_paintingCells(model.cells));

  const paintCell     = usePublish((data) => [model.id, "paint", data]);
  const resetPainting = usePublish((    ) => [model.id, "reset"      ]);

  return {
    paintingCells,
    paintCell,
    resetPainting,
  };
}
