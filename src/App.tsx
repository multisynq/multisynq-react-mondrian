import "./styles.css";

import { useState } from "react";
import { useModelRoot, useSubscribe } from "@croquet/react";

import { hookifyModel, ReactModel, PaintingModel } from "./models/painting";
import Colors from "./components/Colors";
import Painting from "./components/Painting";

export default function App() {
  const {
    // cells: paintingCells, // This is what we need now...
    data,
    paint,
    reset
  } = hookifyModel<PaintingModel>(useModelRoot() as ReactModel);

  console.log("We got data", data)

  

  // We still need this code to get the model data. Eventually this will be wiped off
  const model: PaintingModel = useModelRoot() as PaintingModel;
  const [paintingCells, set_paintingCells] = useState(model.cells);
  useSubscribe(model.id, "cellPainted", () => set_paintingCells(model.cells));
  useSubscribe(model.id, "paintingReset", () => set_paintingCells(model.cells));

  const [selectedColor, set_selectedColor] = useState(null);

  const handleCellClick = (cellId) => {
    if (selectedColor === null) return;
    const payload = { cellId, newColor: selectedColor };
    paint(payload);
  };

  return (
    <div className="App">
      <Colors {...{ selectedColor, set_selectedColor, reset }} />
      <Painting {...{ paintingCells, onClick: handleCellClick }} />
    </div>
  );
}
