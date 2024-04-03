import { useState } from "react";
import { Model, usePublish, useSubscribe } from "@croquet/react";
import { defaultPaintingCells } from "../data/paintingCells";

export class ReactModel extends Model {
  __reactEvents: { scope: string; event: string }[];

  init(options) {
    super.init(options);
    this.__reactEvents = [];
  }

  subscribe<T>(
    scope: string,
    event: string,
    methodName: string | ((e: T) => void)
  ): void {
    this.__reactEvents.push({ scope, event });

    if (typeof methodName === "function") {
      methodName = methodName.name;
    }
    
    // This is a hacky (and maybe dubious) way to add
    // custom logic before and after the Model handler
    // is called. Since closures cannot be serialized, we
    // need to convert `hack` to a String, replace the lost
    // values with literals (obtained at runtime) and then
    // convert that string into a function again.
    // That function will be used by a (yet) undocumented 
    // feature of Croquet that allows you to pass a function
    // instead of a method.
    function hack(data) {
      this.methodName(data);
      this.publish(this.id, "react-updated");
    }

    const hackString = hack
      .toString()
      //
      // replace methodName by the actual method name
      .replace("methodName", methodName)
      //
      // extract only the function body
      .replace(/^[^{]+\{/, "")
      .replace(/\}[^}]*$/, "");

    // this function will receive a single argument: data
    const func = new Function("data", hackString);

    super.subscribe(scope, event, func);
  }
}
ReactModel.register("ReactModel");

export function hookifyModel<T>(model: T): Omit<T, "init"> {
  const [modelState, setModelState] = useState({...model});
  
  useSubscribe(model.id, "react-updated", () => {
    setModelState({...model});
  });
  
  const methods = {};
  model.__reactEvents.forEach(({ scope, event }) => {
    methods[event] = usePublish((data) => [scope, event, data]);
  });
  
  const properties = {};
  for(const p in modelState) {
    if(p !== '__reactEvents') {
      properties[p] = modelState[p]
    }
  }

  return { ...properties, ...methods } as T;
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
