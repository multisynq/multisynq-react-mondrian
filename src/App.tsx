import "./styles.css";

import { useState } from "react";

import { usePaintingModel } from "./models/painting";
import Colors from "./components/Colors";
import Painting from "./components/Painting";

export default function App() {

  const { paintingCells, paintCell, resetPainting } = usePaintingModel();

  const [selectedColor, set_selectedColor] = useState(null);

  const handleCellClick = (cellId) => {
    if (selectedColor === null) return;
    const payload = { cellId, newColor: selectedColor };
    paintCell(payload);
  };

  return (
    <div className="App">
      <Colors {...{ selectedColor, set_selectedColor, resetPainting }} />
      <Painting {...{ paintingCells, onClick: handleCellClick }} />
    </div>
  );
}
