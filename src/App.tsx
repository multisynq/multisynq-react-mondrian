import "./styles.css";

import { useState } from "react";
import { useReactModelRoot } from "./bindings";

import { PaintingModel } from "./models/painting";
import Colors from "./components/Colors";
import Painting from "./components/Painting";

export default function App() {
  const { cells, paint, reset } = useReactModelRoot<PaintingModel>();

  const [selectedColor, set_selectedColor] = useState(null);

  const handleCellClick = (cellId) => {
    if (selectedColor === null) return;
    const payload = { cellId, newColor: selectedColor };
    paint(payload);
  };
  
  return (
    <div className="App">
      <Colors {...{ selectedColor, set_selectedColor, reset }} />
      <Painting {...{ paintingCells: cells, onClick: handleCellClick }} />
    </div>
  );
}
