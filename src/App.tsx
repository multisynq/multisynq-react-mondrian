import "./styles.css";

import { useState } from "react";
import { useModelRoot, useSubscribe } from "@croquet/react";

import { hookifyModel, ReactModel, PaintingModel } from "./models/painting";
import Colors from "./components/Colors";
import Painting from "./components/Painting";

export default function App() {
  const {
    cells,
    paint,
    reset,
  } = hookifyModel<PaintingModel>(useModelRoot() as PaintingModel);

  const paintingCells = cells

  const [selectedColor, set_selectedColor] = useState(null);

  const handleCellClick = (cellId) => {
    if (selectedColor === null) return;
    const payload = { cellId, newColor: selectedColor };
    paint(payload);
  };
  if (!paintingCells) {
    return null;
  }
  return (
    <div className="App">
      <Colors {...{ selectedColor, set_selectedColor, reset }} />
      <Painting {...{ paintingCells, onClick: handleCellClick }} />
    </div>
  );
}
