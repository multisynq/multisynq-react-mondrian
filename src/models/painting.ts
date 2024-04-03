import React, { useState } from "react";
import { Model, useModelRoot, usePublish, useSubscribe } from "@croquet/react";
import { defaultPaintingCells } from "../data/paintingCells";

export class ReactModel extends Model {
  events: { scope: string; event: string }[];

  init(options) {
    super.init(options);
    this.events = [];
  }

  subscribe<T>(
    scope: string,
    event: string,
    methodName: string | ((e: T) => void)
  ): void {
    this.events.push({ scope, event });
    // super.subscribe(scope, event, methodName);
    // super.subscribe(scope, event, this.publishUpdate)

    // // For now it's not possible to wrap methodName
    // // inside a decorator, because we would lose the
    // // reference to it (we cannot serialize closures in Croquet)
    if (typeof methodName === "function") {
      methodName = methodName.name;
    }
    console.log("Subscribing...", methodName);
    function hack(data) {
      // Do some stuff...
      console.log("Event received in model!!");

      this.methodName(data);

      // Do some other stuff...
      console.log("publishing react-updated event");
      this.publish(this.id, "react-updated");
    }

    const hackString = hack
      .toString()
      .replace("methodName", methodName)
      .replace("this.id", JSON.stringify(this.id))
      .replace(/^[^{]+\{/, "")
      .replace(/\}[^}]*$/, "");

    // console.log(hackString)

    const func = new Function("data", hackString);

    // console.log(func)

    super.subscribe(scope, event, func);
  }
}
ReactModel.register("ReactModel");

export function hookifyModel<T>(model: ReactModel): Omit<T, "init"> {
  const methods = {};

  const [modelState, setModelState] = useState(model);

  useSubscribe(model.id, "react-updated", () => {
    console.log("Vanessa is right!!", model);
    setModelState(model);
  });

  model.events.forEach(({ scope, event }) => {
    methods[event] = usePublish((data) => [scope, event, data]);
  });

  return { ...methods } as T;
}

export class PaintingModel extends ReactModel {
  cells: { id: number; color: string }[];

  init(options) {
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

// export function usePaintingModel() {
//   const model: PaintingModel = useModelRoot() as PaintingModel;

//   const [paintingCells, set_paintingCells] = useState(model.cells);
//   useSubscribe(model.id, "cellPainted",   () => set_paintingCells(model.cells));
//   useSubscribe(model.id, "paintingReset", () => set_paintingCells(model.cells));

//   const paint = usePublish((data) => [model.id, "paint", data]);
//   const reset = usePublish((    ) => [model.id, "reset"      ]);

//   return {
//     paintingCells,
//     paint,
//     reset,
//   };
// }
